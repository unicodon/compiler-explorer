// Copyright (c) 2017, Matt Godbolt & Rubén Rincón
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

const BaseCompiler = require('../base-compiler'),
    argumentParsers = require("./argument-parsers");

class JavaScriptCompiler extends BaseCompiler {
    getArgumentParser() {
        return argumentParsers.JavaScriptCore;
    }

    optionsForFilter(filters, outputFilename) {
        let options = ['-d', '-o', this.filename(outputFilename)];
        return options;
    }

    prepareArguments(userOptions, filters, backendOptions, inputFilename, outputFilename) {
        let options = this.optionsForFilter(filters, outputFilename, userOptions);
        backendOptions = backendOptions || {};

        if (this.compiler.options) {
            options = options.concat(this.compiler.options.split(" "));
        }

        if (this.compiler.supportsOptOutput && backendOptions.produceOptInfo) {
            options = options.concat(this.compiler.optArg);
        }

        userOptions = this.filterUserOptions(userOptions);
        return options.concat(userOptions || []).concat(['-f', this.filename(inputFilename)]);
    }

    postProcessAsm(result) {
        if (!result.okToCache) return result;
	return result;
    }

}

module.exports = JavaScriptCompiler;
