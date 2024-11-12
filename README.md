# KT3

## Description

KT3 is a project developed in Python that uses the FastAPI framework for creating a RESTful API. The project also includes a PostgreSQL database and uses Liquibase for database change management.

## Project Structure

- **api**: Contains the source code of the API, including routes and controllers.
- **db**: Contains the database initialization and migration scripts.
- **liquibase**: Contains the Liquibase configuration and scripts for database change management.

## Technologies Used

- **Python**: Main programming language.
- **FastAPI**: Framework for creating the API.
- **PostgreSQL**: Relational database.
- **Liquibase**: Tool for database change management.
- **Docker**: For containerizing services.

## Configuration and Execution

### Prerequisites

- Docker
- Docker Compose

### Execution Steps

1. Clone the repository.
2. Create a `.env` file in the `api` directory with the necessary environment variables.
3. Create a `.env` file in the `liquibase` directory with the necessary environment variables.
4. Run `docker-compose up --build` to build and start the containers.

### Main Endpoints

- **Account Groups**
  - `GET /account_groups/`: Retrieves the list of account groups.
  - `GET /account_groups/{account_group_id}`: Retrieves an account group by ID.
  - `POST /account_groups/`: Creates a new account group.

- **Entries**
  - `GET /entries/`: Retrieves the list of entries.
  - `GET /entries/{entry_id}`: Retrieves an entry by ID.
  - `POST /entries/`: Creates a new entry.

## Contribution

To contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make the necessary changes and commit (`git commit -am 'Add new feature'`).
4. Push the changes to your fork (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.