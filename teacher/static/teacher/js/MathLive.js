import MathLive from 'https://unpkg.com/mathlive/dist/mathlive.mjs';
        // import MathLive from '/src/mathlive.js';
        let entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        function escapeHtml(string) {
            return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                return entityMap[s];
            });
        }

        // (function () {
        //     const mf = MathLive.makeMathField('question-textarea', {
        //         smartMode: true,
        //         virtualKeyboardMode: 'manual',
        //         customVirtualKeyboardLayers: {
        //             'layer-name': {
        //                 styles: '',
        //                 rows: [
        //                     [
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\sin',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\sin^{-1}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\ln',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\exponentialE^{#?}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\operatorname{lcm}(#?)',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\operatorname{ceil}(#?)',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\lim_{n\\to\\infty}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\int',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\operatorname{abs}(#?)',
        //                         }
        //                     ],
        //                     [
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\cos',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\cos^{-1}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\ln_{10}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '$$10^{#?}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\operatorname{gcd}(#?)',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\operatorname{floor}(#?)',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\sum_{n\\mathop=0}^{\\infty}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\int_{0}^{\\infty}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\operatorname{sign}(#?)',
        //                         }
        //                     ],
        //                     [
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\tan',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\tan^{-1}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\log_{#?}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\sqrt[#?]{#0}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\operatorname{mod}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\operatorname{round}(#?)',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\prod_{n\\mathop=0}^{\\infty}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '\\frac{\\differentialD #0}{\\differentialD x}',
        //                         },
        //                         {
        //                             class: 'action font-glyph bottom right',
        //                             command: 'deletePreviousChar',
        //                             label: '⌫',
        //                         }
        //                     ],
        //                     [
        //                         {
        //                             class: 'keycap',
        //                             latex: '(',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: ')',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '$$x^{#?}',
        //                         },
        //                         {
        //                             class: 'keycap',
        //                             latex: '$$x_{#?}',
        //                         },
        //                         {
        //                             class: 'keycap w20',
        //                             key: " ",
        //                             command: ["typedText"," ",{"focus":true,"feedback":true,"simulateKeystroke":true}],
        //                         },
        //                         {
        //                             class: 'action',
        //                             command: 'moveToPreviousChar',
        //                             label: '<svg style="user-select: auto;"><use xlink:href="#svg-arrow-left" style="user-select: auto;"></use></svg>',
        //                         },
        //                         {
        //                             class: 'action',
        //                             command: 'moveToNextChar',
        //                             label: '<svg style="user-select: auto;"><use xlink:href="#svg-arrow-right" style="user-select: auto;"></use></svg>',
        //                         },
        //                         {
        //                             class: 'action',
        //                             command: 'moveToNextPlaceholder',
        //                             label: '<svg style="user-select: auto;"><use xlink:href="#svg-tab" style="user-select: auto;"></use></svg>',
        //                         }
        //                     ],
        //                 ],
        //             },
        //         },
        //         customVirtualKeyboards: {
        //             'keyboard-name': {
        //                 label: 'Json',
        //                 tooltip: 'Json keyboard',
        //                 layer: 'layer-name',
        //             },
        //         },
        //         virtualKeyboards: 'keyboard-name',
        //
        //         onContentDidChange: (mf) => {
        //             const latex = mf.$text();
        //             $('latex').innerHTML = escapeHtml(
        //                 latex
        //             );
        //
        //             //   const mathJSON = MathLive.latexToAST(latex);
        //             //   document.getElementById('mathjson').innerHTML = escapeHtml(
        //             //       JSON.stringify(mathJSON)
        //             //  );
        //         },
        //     });
        //
        //     function updateOutput(mathfield) {
        //         const ast = MathLive.latexToAST(mathfield.$text());
        //         const result = evaluate(ast);
        //         document.getElementById('result').innerHTML =
        //             typeof result !== 'undefined' ? result.toString() : '';
        //
        //         document.getElementById('output').innerHTML = escapeHtml(
        //             JSON.stringify(ast)
        //         );
        //     }
        // })();