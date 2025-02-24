> This question is relevant for **chaos backend**

# DevSoc Subcommittee Recruitment: Chaos Backend

***Complete as many questions as you can.***

## Question 1
You have been given a skeleton function `process_data` in the `data.rs` file.
Complete the parameters and body of the function so that given a JSON request of the form

```json
{
  "data": ["Hello", 1, 5, "World", "!"]
}
```

the handler returns the following JSON:
```json
{
  "string_len": 11,
  "int_sum": 6
}
```

Edit the `DataResponse` and `DataRequest` structs as you need.

## Question 2

### a)
Write (Postgres) SQL `CREATE TABLE` statements to create the following schema.
Make sure to include foreign keys for the relationships that will `CASCADE` upon deletion.
![Database Schema](db_schema.png)

**Answer box:**
```sql
CREATE TABLE forms (
    id		int,
    title	text,
    description	text,
    PRIMARY KEY (id)
);

CREATE TABLE questions (
    id			int,
    form_id		int,
    title		text,
    question_type	question_type,
    PRIMARY KEY (id),
    FOREIGN KEY (form_id) REFERENCES forms(id)
);

CREATE TABLE question_options (
    id		int,
    question_id	int,
    option	text,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);
```

### b)
Using the above schema, write a (Postgres) SQL `SELECT` query to return all questions in the following format, given the form id `26583`:
```
   id    |   form_id   |           title             |   question_type   |     options
------------------------------------------------------------------------------------------------------------
 2       | 26583       | What is your full name?     | ShortAnswer       | [null]
 3       | 26583       | What languages do you know? | MultiSelect       | {"Rust", "JavaScript", "Python"}
 7       | 26583       | What year are you in?       | MultiChoice       | {"1", "2", "3", "4", "5+"}
```

**Answer box:**
```sql
SELECT		q.id, q.form_id, q.title, q.question_type, array_agg(qo.option) AS options
FROM		questions q
LEFT JOIN	question_options qo ON q.id = qo.question_id
GROUP BY	q.id
;
```
