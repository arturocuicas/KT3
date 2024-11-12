FROM python:3.10-slim-buster as requirements-stage
WORKDIR /tmp 
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN pip install poetry
COPY ./pyproject.toml ./poetry.lock* /tmp/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes


FROM python:3.10-slim-buster as develoment
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /home/api
COPY ./pyproject.toml ./poetry.lock* ./
RUN pip install poetry
RUN poetry install
CMD ["poetry","run" , "uvicorn", "main:app", "--host", "0.0.0.0"]


FROM python:3.10-slim-buster as production
RUN mkdir -p /home/api
RUN addgroup --system app && adduser --system --group app
ENV APP_home=/home/api
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV ENVIRONMENT=local
WORKDIR $APP_home
COPY --from=requirements-stage /tmp/requirements.txt /home/api/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /home/api/requirements.txt
COPY . $APP_home
RUN chown -R app:app $APP_home
USER app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7000", "--reload"]