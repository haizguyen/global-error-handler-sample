
# Global Error Handler Sample Project

## Introduction
This sample project demonstrates the integration of:

- A Global Error Handler leveraging **NgZone**.
- Comprehensive error handling for both runtime and HTTP errors.
- Centralized logging through **LogService** using **NgRx Store**.
- User notifications via **SweetAlert2** (popup) and **MatSnackBar** (toast).
- A **DemoComponent** for testing logging and error capturing mechanisms.

## Installation
To install the project dependencies, run:

```bash
npm install
```

## Running the Project
To start the development server, execute:

```bash
ng serve
```

Then navigate to `http://localhost:4200/` in your browser.

## Features
| Button | Description |
|--------|-------------|
| **Log Success (Toast)** | Records a success log and displays a toast notification. |
| **Log Error (Popup)**  | Records an error log and displays a popup notification. |
| **Throw Error**        | Simulates an error to test the Global Error Handler. |

## Project Structure
```
src/app/
  ├── global-error-handler/  // Global error handling logic
  ├── demo/                  // Demo component for testing
  ├── app.module.ts          // Application module
  ├── app.component.ts       // Root component
```

## Notes
- **SweetAlert2** and **MatSnackBar** can be easily replaced or customized via the `NotificationService`.
- All API interactions are automatically logged using the `ApiLoggingInterceptor`.

## License
This project is provided as a sample and is open for modification and use within your own applications.
