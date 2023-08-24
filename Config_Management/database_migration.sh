#!/usr/bin/env bash
# Perfoms Migration to database on modifying models.
alembic revision --autogenerate -m "Database Migration"
alembic upgrade head
