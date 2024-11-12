-- liquibase formatted sql

-- changeset arturo:1
create table account_groups (
    id uuid not null,
    name varchar,
    created_at timestamp not null,
    updated_at timestamp not null
);

-- changeset arturo:2
create table accounts (
    id uuid not null,
    account_group_id uuid not null,
    code integer,
    name varchar,
    created_at timestamp not null,
    updated_at timestamp not null
);

-- changeset arturo:3
create table entries (
    id uuid not null,
    account_id uuid not null,
    description text,
    date_period date,
    amount numeric(15, 2),
    created_at timestamp not null,
    updated_at timestamp not null
);
