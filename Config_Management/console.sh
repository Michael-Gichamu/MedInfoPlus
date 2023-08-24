#!/bin/bash

# Check if an argument was provided
if [ -z "$1" ]; then
    echo "Usage: $0 '<command>'"
    exit 1
fi

echo "$1" | ./console.py
