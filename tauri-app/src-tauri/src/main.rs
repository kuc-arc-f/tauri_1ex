// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::command;

fn main() {
    tauri_app_lib::run()
}

/*
#[command]
fn greet(name: &str) -> String {
  format!("Hello, {}!", name)
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![greet]) // コマンドを登録
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
*/

