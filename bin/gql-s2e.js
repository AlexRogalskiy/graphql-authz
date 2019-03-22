#!/usr/bin/env node

// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


const {schemaToEntitlements, errors} = require('../lib/graphql.js');
const fs = require('fs');

const filename = process.argv[2];

if (!fs.existsSync(filename)){
    console.error("Error: File does not exist");
    process.exit(1);
}

const file_contents = fs.readFileSync(filename).toString();

try {
    let entitlements_map = schemaToEntitlements(file_contents);
    console.log(JSON.stringify(entitlements_map, null, 2));
} catch (e) {
    if (e instanceof errors.GraphQLError) {
        console.error("Error: "+e.message);
        console.error("Location: "+JSON.stringify(e.locations));
        process.exit(1);
    } else {
        throw e;
    }
}


