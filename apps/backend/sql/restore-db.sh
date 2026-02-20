#!/bin/bash

# Database restore script for Strapi
# Restores the database from strapi_dump.sql

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DUMP_FILE="$SCRIPT_DIR/strapi_dump.sql"

# DigitalOcean Database Configuration
DB_HOST="${DATABASE_HOST:-yovoi-do-user-4846075-0.j.db.ondigitalocean.com}"
DB_PORT="${DATABASE_PORT:-25060}"
DB_NAME="${DATABASE_NAME:-defaultdb}"
DB_USER="${DATABASE_USERNAME:-doadmin}"
DB_PASSWORD="${DATABASE_PASSWORD:-test}"
DB_SSLMODE="${DATABASE_SSLMODE:-require}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Strapi Database Restore Script ===${NC}"
echo ""
echo "Configuration:"
echo "  Host:     $DB_HOST"
echo "  Port:     $DB_PORT"
echo "  Database: $DB_NAME"
echo "  User:     $DB_USER"
echo "  SSL Mode: $DB_SSLMODE"
echo "  Dump:     $DUMP_FILE"
echo ""

# Check if dump file exists
if [ ! -f "$DUMP_FILE" ]; then
    echo -e "${RED}Error: Dump file not found at $DUMP_FILE${NC}"
    exit 1
fi

# Confirm before proceeding
read -p "This will DROP all existing data in '$DB_NAME'. Continue? (y/N): " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

# Set password for psql commands
export PGPASSWORD="$DB_PASSWORD"
export PGSSLMODE="$DB_SSLMODE"

echo ""
echo -e "${YELLOW}Clearing database '$DB_NAME'...${NC}"

# For managed databases (like DigitalOcean), we can't drop the default database.
# Instead, we drop and recreate the public schema to clear all data.
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
-- Drop all tables, sequences, functions, etc. in public schema
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO $DB_USER;
GRANT ALL ON SCHEMA public TO public;
" || {
    echo -e "${RED}Error: Could not clear database schema.${NC}"
    exit 1
}

echo -e "${GREEN}Database cleared successfully.${NC}"

echo -e "${YELLOW}Restoring database from dump...${NC}"

# Restore the database
# Filter out problematic lines:
# - \restrict / \unrestrict commands (custom psql commands)
# - OWNER TO postgres (can't set ownership to non-existent user)
# - ALTER ... OWNER TO postgres
sed -e '/^\\restrict/d' \
    -e '/^\\unrestrict/d' \
    -e 's/OWNER TO postgres/OWNER TO '"$DB_USER"'/g' \
    "$DUMP_FILE" | \
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
    -v ON_ERROR_STOP=0

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Database restored successfully!${NC}"
else
    echo ""
    echo -e "${RED}✗ Database restore completed with some warnings/errors.${NC}"
    echo "  Check the output above for details."
fi

# Cleanup
unset PGPASSWORD
unset PGSSLMODE
