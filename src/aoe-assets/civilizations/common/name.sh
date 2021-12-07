#!/bin/bash

dir=$1
ext=".png"

for file in $(find $dir -name '*' )
do
    mv -- "$file" "$file$ext"
done
