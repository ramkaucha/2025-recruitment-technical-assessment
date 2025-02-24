use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};

pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {
    // Calculate sums and return response
    //
    let mut string_len = 0;
    let mut int_sum = 0;

    for item in request.data {
        if let Ok(num) = item.parse::<i32>() {
            int_sum += num;
        } else {
            string_len += item.len()
        }
    }

    let response = DataResponse {
        string_len,
        int_sum
    };

    (StatusCode::OK, Json(response))
}

#[derive(Deserialize)]
pub struct DataRequest {
    // Add any fields here
    data: Vec<String>
}

#[derive(Serialize)]
pub struct DataResponse {
    // Add any fields here
    string_len: usize,
    int_sum: i32,
}
