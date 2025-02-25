from dataclasses import dataclass
from typing import List, Dict, Optional, Union
from flask import Flask, request, jsonify
import re

# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
	name: str

@dataclass
class RequiredItem():
	name: str
	quantity: int

@dataclass
class Recipe(CookbookEntry):
	required_items: List[RequiredItem]

@dataclass
class Ingredient(CookbookEntry):
	cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook = None
if cookbook is None:
	cookbook = {}

# Task 1 helper (don't touch)
@app.route("/parse", methods=['POST'])
def parse():
	data = request.get_json()
	recipe_name = data.get('input', '')
	parsed_name = parse_handwriting(recipe_name)
	if parsed_name is None:
		return 'Invalid recipe name', 400
	return jsonify({'msg': parsed_name}), 200

# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that 
def parse_handwriting(recipeName: str) -> Union[str | None]:
	# replacing hyphhen and undrscores with space
	recipeName = re.sub('[-_]', ' ', recipeName)
	# only contains letters and whitespaces, removed otherwise
	recipeName = re.sub(r'[^a-zA-Z\s]', '', recipeName)

	# multiple letter, capitalise
	recipeName = ' '.join(word.capitalize() for word in recipeName.split())

	# one whitesapce between words
	recipeName = re.sub(r'\s\s+', ' ', recipeName).strip()

	return recipeName if len(recipeName) > 0 else None

# Helper function for task 3
# Recursively calculates total cook time and collects all the base ingredient for the recipe
def calculate_recipe_details(recipe_name: str, quantity: int =1) -> Optional[Dict[str, int]]:
	if recipe_name not in cookbook:
		return None, None
	
	entry = cookbook[recipe_name]

	if isinstance(entry, Ingredient):
		return entry.cook_time * quantity, { recipe_name: quantity }
	
	total_cook_time = 0
	ingredients = {}

	for item in entry.required_items:
		item_name = item.name
		item_quantity = item.quantity * quantity

		item_cook_time, item_ingredients = calculate_recipe_details(item_name, item_quantity)

		if item_cook_time is None:
			return None, None

		total_cook_time += item_cook_time

		for ingredient_name, ingredient_quantity in item_ingredients.items():
			if ingredient_name in ingredients:
				ingredients[ingredient_name] += ingredient_quantity
			else:
				ingredients[ingredient_name] = ingredient_quantity
	
	return total_cook_time, ingredients

# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route('/entry', methods=['POST'])
def create_entry():
	try:
		cook = request.json
		print(cook)
		# print(cook)

		print(f"Cookbook keys before: {list(cookbook.keys())}", flush=True)
		if not cook or 'type' not in cook or 'name' not in cook:
			return 'Invalid recipe/ingredient', 400

		if cook['type'] not in ['recipe', 'ingredient']:
			return 'Invalid type', 400
		
		name = parse_handwriting(cook['name'])
		if not name:
			return 'Invalid entry', 400
		
		if name in cookbook:
			return 'Duplicate name', 400
		
		if cook['type'] == 'ingredient':
			if 'cookTime' not in cook or not isinstance(cook['cookTime'], int) or cook['cookTime'] < 0:
				return 'Invalid Entry', 400
			
			ingredient = Ingredient(
				name=name,
				cook_time=cook['cookTime']
			)
			cookbook[name] = ingredient
		elif cook['type'] == 'recipe':
			if 'requiredItems' not in cook or not isinstance(cook['requiredItems'], list):
				return 'Invalid entry', 400
			
			required_items = []
			require_item_name = set()

			for item in cook['requiredItems']:
				if not isinstance(item, dict) or 'name' not in item or 'quantity' not in item:
					return 'Invalid entry', 400
				
				item_name = parse_handwriting(item['name'])
				if not item_name:
					return 'Invalid entry', 400
				
				if item_name in require_item_name:
					return 'Invalid entry', 400
				require_item_name.add(item_name)
				
				if not isinstance(item['quantity'], int) or item['quantity'] <= 0:
					return 'Invalid entry', 400
				
				required_item = RequiredItem(
					name=item_name,
					quantity=item['quantity']
				)
				required_items.append(required_item)
			
			recipe = Recipe(
				name=name,
				required_items=required_items
			)
			cookbook[name] = recipe
		
		return '', 200

	except Exception as e:
		return str(e), 500


# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route('/summary', methods=['GET'])
def summary():
	try:
		recipe_name = request.args.get('name')

		print(recipe_name)		
		recipe_name = parse_handwriting(recipe_name)
		if not recipe_name:
			return 'No name', 400
		
		if recipe_name not in cookbook:
			return 'Not in cook book', 400
		
		entry = cookbook[recipe_name]
		if not isinstance(entry, Recipe):
			return 'Not a recipe', 400
		
		total_cook_time, ingredients = calculate_recipe_details(recipe_name)

		if total_cook_time is None:
			return 'Invalid cook time', 400
		
		ingredients_list = [
			{"name": name, "quantity": quantity} for name, quantity in ingredients.items()
		]

		summary_res = {
			"name": recipe_name,
			"cookTime": total_cook_time,
			"ingredients": ingredients_list
		}

		return jsonify(summary_res), 200
	except Exception as e:
		return str(e), 500


# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == '__main__':
	app.run(debug=True, port=8080)
