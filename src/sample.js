/*
 * Copyright 2015 MTap Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// sample consumer for logger
var logger = require('./logger');
var MongoWriter = require('./mongowriter');

// Initialize mongo logger
var mongologger = new MongoWriter();
// this differs if browser or node.
// Open mongo connection
mongologger.open();
// Plant to logger
logger.plant(mongologger);
// Insert the log messages
logger.i('info-tag', 'This is a info message');
logger.w('warn-tag', 'This is a warn message');
logger.e('error-tag', 'This is a error message');
logger.t('trace-tag', 'This is a trace message');
// Close the mongo connection
mongologger.close();
