function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
(self.webpackChunkcubid_sdk = self.webpackChunkcubid_sdk || []).push([
    [
        187
    ],
    {
        "./node_modules/@mdx-js/react/lib/index.js": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var useMDXComponents = function useMDXComponents(components) {
                var contextComponents = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);
                return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function() {
                    return "function" == typeof components ? components(contextComponents) : _object_spread({}, contextComponents, components);
                }, [
                    contextComponents,
                    components
                ]);
            };
            var MDXProvider = function MDXProvider(properties) {
                var allComponents;
                return allComponents = properties.disableParentContext ? "function" == typeof properties.components ? properties.components(emptyComponents) : properties.components || emptyComponents : useMDXComponents(properties.components), react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider, {
                    value: allComponents
                }, properties.children);
            };
            __webpack_require__.d(__webpack_exports__, {
                R: function() {
                    return useMDXComponents;
                },
                x: function() {
                    return MDXProvider;
                }
            });
            var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
            var emptyComponents = {}, MDXContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);
        },
        "./src/stories/Configure.mdx": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var _createMdxContent = function _createMdxContent(props) {
                var _components = _object_spread({
                    code: "code",
                    h1: "h1",
                    p: "p"
                }, (0, lib.R)(), props.components);
                return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        (0, jsx_runtime.jsx)(dist.W8, {
                            title: "Configure your project"
                        }),
                        "\n",
                        (0, jsx_runtime.jsxs)("div", {
                            className: "sb-container",
                            children: [
                                (0, jsx_runtime.jsxs)("div", {
                                    className: "sb-section-title",
                                    children: [
                                        (0, jsx_runtime.jsx)(_components.h1, {
                                            id: "configure-your-project",
                                            children: "Configure your project"
                                        }),
                                        (0, jsx_runtime.jsx)(_components.p, {
                                            children: "Because Storybook works separately from your app, you'll need to configure it for your specific stack and setup. Below, explore guides for configuring Storybook with popular frameworks and tools. If you get stuck, learn how you can ask for help from our community."
                                        })
                                    ]
                                }),
                                (0, jsx_runtime.jsxs)("div", {
                                    className: "sb-section",
                                    children: [
                                        (0, jsx_runtime.jsxs)("div", {
                                            className: "sb-section-item",
                                            children: [
                                                (0, jsx_runtime.jsx)("img", {
                                                    src: styling_namespaceObject,
                                                    alt: "A wall of logos representing different styling technologies"
                                                }),
                                                (0, jsx_runtime.jsx)("h4", {
                                                    className: "sb-section-item-heading",
                                                    children: "Add styling and CSS"
                                                }),
                                                (0, jsx_runtime.jsx)("p", {
                                                    className: "sb-section-item-paragraph",
                                                    children: "Like with web applications, there are many ways to include CSS within Storybook. Learn more about setting up styling within Storybook."
                                                }),
                                                (0, jsx_runtime.jsxs)("a", {
                                                    href: "https://storybook.js.org/docs/configure/styling-and-css/?renderer=react",
                                                    target: "_blank",
                                                    children: [
                                                        "Learn more",
                                                        (0, jsx_runtime.jsx)(RightArrow, {})
                                                    ]
                                                })
                                            ]
                                        }),
                                        (0, jsx_runtime.jsxs)("div", {
                                            className: "sb-section-item",
                                            children: [
                                                (0, jsx_runtime.jsx)("img", {
                                                    src: context_namespaceObject,
                                                    alt: "An abstraction representing the composition of data for a component"
                                                }),
                                                (0, jsx_runtime.jsx)("h4", {
                                                    className: "sb-section-item-heading",
                                                    children: "Provide context and mocking"
                                                }),
                                                (0, jsx_runtime.jsx)("p", {
                                                    className: "sb-section-item-paragraph",
                                                    children: "Often when a story doesn't render, it's because your component is expecting a specific environment or context (like a theme provider) to be available."
                                                }),
                                                (0, jsx_runtime.jsxs)("a", {
                                                    href: "https://storybook.js.org/docs/writing-stories/decorators/?renderer=react#context-for-mocking",
                                                    target: "_blank",
                                                    children: [
                                                        "Learn more",
                                                        (0, jsx_runtime.jsx)(RightArrow, {})
                                                    ]
                                                })
                                            ]
                                        }),
                                        (0, jsx_runtime.jsxs)("div", {
                                            className: "sb-section-item",
                                            children: [
                                                (0, jsx_runtime.jsx)("img", {
                                                    src: assets_namespaceObject,
                                                    alt: "A representation of typography and image assets"
                                                }),
                                                (0, jsx_runtime.jsxs)("div", {
                                                    children: [
                                                        (0, jsx_runtime.jsx)("h4", {
                                                            className: "sb-section-item-heading",
                                                            children: "Load assets and resources"
                                                        }),
                                                        (0, jsx_runtime.jsxs)("p", {
                                                            className: "sb-section-item-paragraph",
                                                            children: [
                                                                "To link static files (like fonts) to your projects and stories, use the\n",
                                                                (0, jsx_runtime.jsx)(_components.code, {
                                                                    children: "staticDirs"
                                                                }),
                                                                " configuration option to specify folders to load when\nstarting Storybook."
                                                            ]
                                                        }),
                                                        (0, jsx_runtime.jsxs)("a", {
                                                            href: "https://storybook.js.org/docs/configure/images-and-assets/?renderer=react",
                                                            target: "_blank",
                                                            children: [
                                                                "Learn more",
                                                                (0, jsx_runtime.jsx)(RightArrow, {})
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        "\n",
                        (0, jsx_runtime.jsxs)("div", {
                            className: "sb-container",
                            children: [
                                (0, jsx_runtime.jsxs)("div", {
                                    className: "sb-section-title",
                                    children: [
                                        (0, jsx_runtime.jsx)(_components.h1, {
                                            id: "do-more-with-storybook",
                                            children: "Do more with Storybook"
                                        }),
                                        (0, jsx_runtime.jsx)(_components.p, {
                                            children: "Now that you know the basics, let's explore other parts of Storybook that will improve your experience. This list is just to get you started. You can customise Storybook in many ways to fit your needs."
                                        })
                                    ]
                                }),
                                (0, jsx_runtime.jsx)("div", {
                                    className: "sb-section",
                                    children: (0, jsx_runtime.jsxs)("div", {
                                        className: "sb-features-grid",
                                        children: [
                                            (0, jsx_runtime.jsxs)("div", {
                                                className: "sb-grid-item",
                                                children: [
                                                    (0, jsx_runtime.jsx)("img", {
                                                        src: docs_namespaceObject,
                                                        alt: "A screenshot showing the autodocs tag being set, pointing a docs page being generated"
                                                    }),
                                                    (0, jsx_runtime.jsx)("h4", {
                                                        className: "sb-section-item-heading",
                                                        children: "Autodocs"
                                                    }),
                                                    (0, jsx_runtime.jsx)("p", {
                                                        className: "sb-section-item-paragraph",
                                                        children: "Auto-generate living,\ninteractive reference documentation from your components and stories."
                                                    }),
                                                    (0, jsx_runtime.jsxs)("a", {
                                                        href: "https://storybook.js.org/docs/writing-docs/autodocs/?renderer=react",
                                                        target: "_blank",
                                                        children: [
                                                            "Learn more",
                                                            (0, jsx_runtime.jsx)(RightArrow, {})
                                                        ]
                                                    })
                                                ]
                                            }),
                                            (0, jsx_runtime.jsxs)("div", {
                                                className: "sb-grid-item",
                                                children: [
                                                    (0, jsx_runtime.jsx)("img", {
                                                        src: share_namespaceObject,
                                                        alt: "A browser window showing a Storybook being published to a chromatic.com URL"
                                                    }),
                                                    (0, jsx_runtime.jsx)("h4", {
                                                        className: "sb-section-item-heading",
                                                        children: "Publish to Chromatic"
                                                    }),
                                                    (0, jsx_runtime.jsx)("p", {
                                                        className: "sb-section-item-paragraph",
                                                        children: "Publish your Storybook to review and collaborate with your entire team."
                                                    }),
                                                    (0, jsx_runtime.jsxs)("a", {
                                                        href: "https://storybook.js.org/docs/sharing/publish-storybook/?renderer=react#publish-storybook-with-chromatic",
                                                        target: "_blank",
                                                        children: [
                                                            "Learn more",
                                                            (0, jsx_runtime.jsx)(RightArrow, {})
                                                        ]
                                                    })
                                                ]
                                            }),
                                            (0, jsx_runtime.jsxs)("div", {
                                                className: "sb-grid-item",
                                                children: [
                                                    (0, jsx_runtime.jsx)("img", {
                                                        src: figma_plugin_namespaceObject,
                                                        alt: "Windows showing the Storybook plugin in Figma"
                                                    }),
                                                    (0, jsx_runtime.jsx)("h4", {
                                                        className: "sb-section-item-heading",
                                                        children: "Figma Plugin"
                                                    }),
                                                    (0, jsx_runtime.jsx)("p", {
                                                        className: "sb-section-item-paragraph",
                                                        children: "Embed your stories into Figma to cross-reference the design and live\nimplementation in one place."
                                                    }),
                                                    (0, jsx_runtime.jsxs)("a", {
                                                        href: "https://storybook.js.org/docs/sharing/design-integrations/?renderer=react#embed-storybook-in-figma-with-the-plugin",
                                                        target: "_blank",
                                                        children: [
                                                            "Learn more",
                                                            (0, jsx_runtime.jsx)(RightArrow, {})
                                                        ]
                                                    })
                                                ]
                                            }),
                                            (0, jsx_runtime.jsxs)("div", {
                                                className: "sb-grid-item",
                                                children: [
                                                    (0, jsx_runtime.jsx)("img", {
                                                        src: testing_namespaceObject,
                                                        alt: "Screenshot of tests passing and failing"
                                                    }),
                                                    (0, jsx_runtime.jsx)("h4", {
                                                        className: "sb-section-item-heading",
                                                        children: "Testing"
                                                    }),
                                                    (0, jsx_runtime.jsx)("p", {
                                                        className: "sb-section-item-paragraph",
                                                        children: "Use stories to test a component in all its variations, no matter how\ncomplex."
                                                    }),
                                                    (0, jsx_runtime.jsxs)("a", {
                                                        href: "https://storybook.js.org/docs/writing-tests/?renderer=react",
                                                        target: "_blank",
                                                        children: [
                                                            "Learn more",
                                                            (0, jsx_runtime.jsx)(RightArrow, {})
                                                        ]
                                                    })
                                                ]
                                            }),
                                            (0, jsx_runtime.jsxs)("div", {
                                                className: "sb-grid-item",
                                                children: [
                                                    (0, jsx_runtime.jsx)("img", {
                                                        src: accessibility_namespaceObject,
                                                        alt: "Screenshot of accessibility tests passing and failing"
                                                    }),
                                                    (0, jsx_runtime.jsx)("h4", {
                                                        className: "sb-section-item-heading",
                                                        children: "Accessibility"
                                                    }),
                                                    (0, jsx_runtime.jsx)("p", {
                                                        className: "sb-section-item-paragraph",
                                                        children: "Automatically test your components for a11y issues as you develop."
                                                    }),
                                                    (0, jsx_runtime.jsxs)("a", {
                                                        href: "https://storybook.js.org/docs/writing-tests/accessibility-testing/?renderer=react",
                                                        target: "_blank",
                                                        children: [
                                                            "Learn more",
                                                            (0, jsx_runtime.jsx)(RightArrow, {})
                                                        ]
                                                    })
                                                ]
                                            }),
                                            (0, jsx_runtime.jsxs)("div", {
                                                className: "sb-grid-item",
                                                children: [
                                                    (0, jsx_runtime.jsx)("img", {
                                                        src: theming_namespaceObject,
                                                        alt: "Screenshot of Storybook in light and dark mode"
                                                    }),
                                                    (0, jsx_runtime.jsx)("h4", {
                                                        className: "sb-section-item-heading",
                                                        children: "Theming"
                                                    }),
                                                    (0, jsx_runtime.jsx)("p", {
                                                        className: "sb-section-item-paragraph",
                                                        children: "Theme Storybook's UI to personalize it to your project."
                                                    }),
                                                    (0, jsx_runtime.jsxs)("a", {
                                                        href: "https://storybook.js.org/docs/configure/theming/?renderer=react",
                                                        target: "_blank",
                                                        children: [
                                                            "Learn more",
                                                            (0, jsx_runtime.jsx)(RightArrow, {})
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        "\n",
                        (0, jsx_runtime.jsxs)("div", {
                            className: "sb-addon",
                            children: [
                                (0, jsx_runtime.jsxs)("div", {
                                    className: "sb-addon-text",
                                    children: [
                                        (0, jsx_runtime.jsx)("h4", {
                                            children: "Addons"
                                        }),
                                        (0, jsx_runtime.jsx)("p", {
                                            className: "sb-section-item-paragraph",
                                            children: "Integrate your tools with Storybook to connect workflows."
                                        }),
                                        (0, jsx_runtime.jsxs)("a", {
                                            href: "https://storybook.js.org/addons/",
                                            target: "_blank",
                                            children: [
                                                "Discover all addons",
                                                (0, jsx_runtime.jsx)(RightArrow, {})
                                            ]
                                        })
                                    ]
                                }),
                                (0, jsx_runtime.jsx)("div", {
                                    className: "sb-addon-img",
                                    children: (0, jsx_runtime.jsx)("img", {
                                        src: addon_library_namespaceObject,
                                        alt: "Integrate your tools with Storybook to connect workflows."
                                    })
                                })
                            ]
                        }),
                        "\n",
                        (0, jsx_runtime.jsxs)("div", {
                            className: "sb-section sb-socials",
                            children: [
                                (0, jsx_runtime.jsxs)("div", {
                                    className: "sb-section-item",
                                    children: [
                                        (0, jsx_runtime.jsx)("img", {
                                            src: github_namespaceObject,
                                            alt: "Github logo",
                                            className: "sb-explore-image"
                                        }),
                                        (0, jsx_runtime.jsx)(_components.p, {
                                            children: "Join our contributors building the future of UI development."
                                        }),
                                        (0, jsx_runtime.jsxs)("a", {
                                            href: "https://github.com/storybookjs/storybook",
                                            target: "_blank",
                                            children: [
                                                "Star on GitHub",
                                                (0, jsx_runtime.jsx)(RightArrow, {})
                                            ]
                                        })
                                    ]
                                }),
                                (0, jsx_runtime.jsxs)("div", {
                                    className: "sb-section-item",
                                    children: [
                                        (0, jsx_runtime.jsx)("img", {
                                            src: discord_namespaceObject,
                                            alt: "Discord logo",
                                            className: "sb-explore-image"
                                        }),
                                        (0, jsx_runtime.jsxs)("div", {
                                            children: [
                                                (0, jsx_runtime.jsx)(_components.p, {
                                                    children: "Get support and chat with frontend developers."
                                                }),
                                                (0, jsx_runtime.jsxs)("a", {
                                                    href: "https://discord.gg/storybook",
                                                    target: "_blank",
                                                    children: [
                                                        "Join Discord server",
                                                        (0, jsx_runtime.jsx)(RightArrow, {})
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                (0, jsx_runtime.jsxs)("div", {
                                    className: "sb-section-item",
                                    children: [
                                        (0, jsx_runtime.jsx)("img", {
                                            src: youtube_namespaceObject,
                                            alt: "Youtube logo",
                                            className: "sb-explore-image"
                                        }),
                                        (0, jsx_runtime.jsxs)("div", {
                                            children: [
                                                (0, jsx_runtime.jsx)(_components.p, {
                                                    children: "Watch tutorials, feature previews and interviews."
                                                }),
                                                (0, jsx_runtime.jsxs)("a", {
                                                    href: "https://www.youtube.com/@chromaticui",
                                                    target: "_blank",
                                                    children: [
                                                        "Watch on YouTube",
                                                        (0, jsx_runtime.jsx)(RightArrow, {})
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                (0, jsx_runtime.jsxs)("div", {
                                    className: "sb-section-item",
                                    children: [
                                        (0, jsx_runtime.jsx)("img", {
                                            src: tutorials_namespaceObject,
                                            alt: "A book",
                                            className: "sb-explore-image"
                                        }),
                                        (0, jsx_runtime.jsx)("p", {
                                            children: "Follow guided walkthroughs on for key workflows."
                                        }),
                                        (0, jsx_runtime.jsxs)("a", {
                                            href: "https://storybook.js.org/tutorials/",
                                            target: "_blank",
                                            children: [
                                                "Discover tutorials",
                                                (0, jsx_runtime.jsx)(RightArrow, {})
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        "\n",
                        (0, jsx_runtime.jsx)("style", {
                            children: "\n  .sb-container {\n    margin-bottom: 48px;\n  }\n\n  .sb-section {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    gap: 20px;\n  }\n\n  img {\n    object-fit: cover;\n  }\n\n  .sb-section-title {\n    margin-bottom: 32px;\n  }\n\n  .sb-section a:not(h1 a, h2 a, h3 a) {\n    font-size: 14px;\n  }\n\n  .sb-section-item, .sb-grid-item {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .sb-section-item-heading {\n    padding-top: 20px !important;\n    padding-bottom: 5px !important;\n    margin: 0 !important;\n  }\n  .sb-section-item-paragraph {\n    margin: 0;\n    padding-bottom: 10px;\n  }\n\n  .sb-chevron {\n    margin-left: 5px;\n  }\n\n  .sb-features-grid {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    grid-gap: 32px 20px;\n  }\n\n  .sb-socials {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n  }\n\n  .sb-socials p {\n    margin-bottom: 10px;\n  }\n\n  .sb-explore-image {\n    max-height: 32px;\n    align-self: flex-start;\n  }\n\n  .sb-addon {\n    width: 100%;\n    display: flex;\n    align-items: center;\n    position: relative;\n    background-color: #EEF3F8;\n    border-radius: 5px;\n    border: 1px solid rgba(0, 0, 0, 0.05);\n    background: #EEF3F8;\n    height: 180px;\n    margin-bottom: 48px;\n    overflow: hidden;\n  }\n\n  .sb-addon-text {\n    padding-left: 48px;\n    max-width: 240px;\n  }\n\n  .sb-addon-text h4 {\n    padding-top: 0px;\n  }\n\n  .sb-addon-img {\n    position: absolute;\n    left: 345px;\n    top: 0;\n    height: 100%;\n    width: 200%;\n    overflow: hidden;\n  }\n\n  .sb-addon-img img {\n    width: 650px;\n    transform: rotate(-15deg);\n    margin-left: 40px;\n    margin-top: -72px;\n    box-shadow: 0 0 1px rgba(255, 255, 255, 0);\n    backface-visibility: hidden;\n  }\n\n  @media screen and (max-width: 800px) {\n    .sb-addon-img {\n      left: 300px;\n    }\n  }\n\n  @media screen and (max-width: 600px) {\n    .sb-section {\n      flex-direction: column;\n    }\n\n    .sb-features-grid {\n      grid-template-columns: repeat(1, 1fr);\n    }\n\n    .sb-socials {\n      grid-template-columns: repeat(2, 1fr);\n    }\n\n    .sb-addon {\n      height: 280px;\n      align-items: flex-start;\n      padding-top: 32px;\n      overflow: hidden;\n    }\n\n    .sb-addon-text {\n      padding-left: 24px;\n    }\n\n    .sb-addon-img {\n      right: 0;\n      left: 0;\n      top: 130px;\n      bottom: 0;\n      overflow: hidden;\n      height: auto;\n      width: 124%;\n    }\n\n    .sb-addon-img img {\n      width: 1200px;\n      transform: rotate(-12deg);\n      margin-left: 0;\n      margin-top: 48px;\n      margin-bottom: -40px;\n      margin-left: -24px;\n    }\n  }\n  "
                        })
                    ]
                });
            };
            var MDXContent = function MDXContent() {
                var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var _$_object_spread = _object_spread({}, (0, lib.R)(), props.components), MDXLayout = _$_object_spread.wrapper;
                return MDXLayout ? (0, jsx_runtime.jsx)(MDXLayout, _object_spread_props(_object_spread({}, props), {
                    children: (0, jsx_runtime.jsx)(_createMdxContent, _object_spread({}, props))
                })) : _createMdxContent(props);
            };
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                RightArrow: function() {
                    return RightArrow;
                },
                default: function() {
                    return MDXContent;
                }
            });
            __webpack_require__("./node_modules/react/index.js");
            var jsx_runtime = __webpack_require__("./node_modules/react/jsx-runtime.js"), lib = __webpack_require__("./node_modules/@mdx-js/react/lib/index.js"), dist = __webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");
            var github_namespaceObject = __webpack_require__.p + "static/media/github.e4e8df82.svg", discord_namespaceObject = __webpack_require__.p + "static/media/discord.d85804c7.svg", youtube_namespaceObject = __webpack_require__.p + "static/media/youtube.fd046a09.svg", tutorials_namespaceObject = __webpack_require__.p + "static/media/tutorials.fde6e46f.svg", styling_namespaceObject = __webpack_require__.p + "static/media/styling.38cab73b.png", context_namespaceObject = __webpack_require__.p + "static/media/context.645728c6.png", assets_namespaceObject = __webpack_require__.p + "static/media/assets.e6440a95.png", docs_namespaceObject = __webpack_require__.p + "static/media/docs.f7d8b9a8.png", share_namespaceObject = __webpack_require__.p + "static/media/share.161528bb.png", figma_plugin_namespaceObject = __webpack_require__.p + "static/media/figma-plugin.9335a1a9.png", testing_namespaceObject = __webpack_require__.p + "static/media/testing.c720ced2.png", accessibility_namespaceObject = __webpack_require__.p + "static/media/accessibility.2dbc6973.png", theming_namespaceObject = __webpack_require__.p + "static/media/theming.e93de094.png", addon_library_namespaceObject = __webpack_require__.p + "static/media/addon-library.7a58d2cb.png", RightArrow = function() {
                var _components = _object_spread({
                    path: "path",
                    svg: "svg"
                }, (0, lib.R)());
                return (0, jsx_runtime.jsx)(_components.svg, {
                    viewBox: "0 0 14 14",
                    width: "8px",
                    height: "14px",
                    style: {
                        marginLeft: "4px",
                        display: "inline-block",
                        shapeRendering: "inherit",
                        verticalAlign: "middle",
                        fill: "currentColor",
                        "path fill": "currentColor"
                    },
                    children: (0, jsx_runtime.jsx)(_components.path, {
                        d: "m11.1 7.35-5.5 5.5a.5.5 0 0 1-.7-.7L10.04 7 4.9 1.85a.5.5 0 1 1 .7-.7l5.5 5.5c.2.2.2.5 0 .7Z"
                    })
                });
            };
        },
        "./node_modules/@storybook/core/dist/components sync recursive": function(module) {
            var webpackEmptyContext = function webpackEmptyContext(req) {
                var e = new Error("Cannot find module '" + req + "'");
                throw e.code = "MODULE_NOT_FOUND", e;
            };
            webpackEmptyContext.keys = function() {
                return [];
            }, webpackEmptyContext.resolve = webpackEmptyContext, webpackEmptyContext.id = "./node_modules/@storybook/core/dist/components sync recursive", module.exports = webpackEmptyContext;
        },
        "./node_modules/@storybook/core/dist/theming sync recursive": function(module) {
            var webpackEmptyContext = function webpackEmptyContext(req) {
                var e = new Error("Cannot find module '" + req + "'");
                throw e.code = "MODULE_NOT_FOUND", e;
            };
            webpackEmptyContext.keys = function() {
                return [];
            }, webpackEmptyContext.resolve = webpackEmptyContext, webpackEmptyContext.id = "./node_modules/@storybook/core/dist/theming sync recursive", module.exports = webpackEmptyContext;
        },
        "./node_modules/memoizerific sync recursive": function(module) {
            var webpackEmptyContext = function webpackEmptyContext(req) {
                var e = new Error("Cannot find module '" + req + "'");
                throw e.code = "MODULE_NOT_FOUND", e;
            };
            webpackEmptyContext.keys = function() {
                return [];
            }, webpackEmptyContext.resolve = webpackEmptyContext, webpackEmptyContext.id = "./node_modules/memoizerific sync recursive", module.exports = webpackEmptyContext;
        }
    }
]);
