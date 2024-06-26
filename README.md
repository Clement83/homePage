# Non official Olivetin Frontend

This project serves as the frontend for the [Olivetin](https://github.com/OliveTin/OliveTin) project, providing a unified interface to access and manage various actions and services grouped on a single card. The interface is designed with a minimalist, modern look using Tailwind CSS.

## Features

- **Unified Interface:** Actions and services are grouped on a single card for easy access.
- **Webhook Triggering:** Allows users to trigger webhooks with a single click.
- **Dynamic Background:** The background image changes dynamically, adding a visually appealing element to the interface.
- **Responsive Design:** Fully responsive design using Tailwind CSS, ensuring compatibility with various devices and screen sizes.
- **User Authentication:** Secure webhook triggering with Basic HTTP authentication.
- **Console Logging:** Webhook responses are displayed in a console-like toaster for easy debugging.

## Requirements

- Docker

## Getting Started

To get started with the Olivetin frontend, follow these steps:

### Prerequisites

Ensure you have Docker installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/olivetin-frontend.git
    cd olivetin-frontend
    ```

2. Create a `.env` file to store your environment variables:
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your actual username and password for the Basic HTTP authentication.

### Running the Application

To start the application, use the following command:

```bash
make start
```

This command will use Docker Compose to build and run the application.

### Stopping the Application

To stop the application, use:

```bash
make stop
```

## Usage

Once the application is running, navigate to `http://localhost:5155` in your web browser. You will see a dashboard with various cards representing different services and actions.

- **Visit Service:** Clicking on a card will open the corresponding service in a new tab.
- **Trigger Webhook:** Click on the webhook button within a card to trigger the associated action. The response will be displayed in a toaster at the bottom of the screen.

## Development

### File Structure

- `app.py`: Main Flask application file.
- `templates/index.html`: HTML template for the frontend.
- `config.json`: Configuration file for defining services and actions.

### Environment Variables

- `USERNAME`: Basic HTTP auth username.
- `PASSWORD`: Basic HTTP auth password.
- `OLIVETIN_URL`: Url to your olivetin instance (https://myOlivetinInstance.me/api/StartActionByGetAndWait/)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the existing style and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/)
- [Flask](https://flask.palletsprojects.com/)
- [Docker](https://www.docker.com/)
