'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend-project-template documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-018d1a8dd04d6a878d9032555442727304b7fc8ca87419c801177cbc7aeeba0f7261173012d27190a902976f9c5cf8f7f7fa9dc1743e6b4d982f60ac018322cc"' : 'data-target="#xs-injectables-links-module-AppModule-018d1a8dd04d6a878d9032555442727304b7fc8ca87419c801177cbc7aeeba0f7261173012d27190a902976f9c5cf8f7f7fa9dc1743e6b4d982f60ac018322cc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-018d1a8dd04d6a878d9032555442727304b7fc8ca87419c801177cbc7aeeba0f7261173012d27190a902976f9c5cf8f7f7fa9dc1743e6b4d982f60ac018322cc"' :
                                        'id="xs-injectables-links-module-AppModule-018d1a8dd04d6a878d9032555442727304b7fc8ca87419c801177cbc7aeeba0f7261173012d27190a902976f9c5cf8f7f7fa9dc1743e6b4d982f60ac018322cc"' }>
                                        <li class="link">
                                            <a href="injectables/SwaggerOptions.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SwaggerOptions</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CacheModule.html" data-type="entity-link" >CacheModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EnvironmentModule.html" data-type="entity-link" >EnvironmentModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EnvironmentModule-f56e8448b319f5b7585bbab76d19ef23c704b1aa4a3a6a19c93b39a5eb3e11c17db6b9a91061ea05c0fe68e8b5ffade95a4d42137a1c7d02f444c3020cd966cf"' : 'data-target="#xs-injectables-links-module-EnvironmentModule-f56e8448b319f5b7585bbab76d19ef23c704b1aa4a3a6a19c93b39a5eb3e11c17db6b9a91061ea05c0fe68e8b5ffade95a4d42137a1c7d02f444c3020cd966cf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EnvironmentModule-f56e8448b319f5b7585bbab76d19ef23c704b1aa4a3a6a19c93b39a5eb3e11c17db6b9a91061ea05c0fe68e8b5ffade95a4d42137a1c7d02f444c3020cd966cf"' :
                                        'id="xs-injectables-links-module-EnvironmentModule-f56e8448b319f5b7585bbab76d19ef23c704b1aa4a3a6a19c93b39a5eb3e11c17db6b9a91061ea05c0fe68e8b5ffade95a4d42137a1c7d02f444c3020cd966cf"' }>
                                        <li class="link">
                                            <a href="injectables/ApplicationEnvironment.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApplicationEnvironment</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApplicationInterface.html" data-type="entity-link" >ApplicationInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomerEntity.html" data-type="entity-link" >CustomerEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseInterface.html" data-type="entity-link" >DatabaseInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/MongooseEnvironment.html" data-type="entity-link" >MongooseEnvironment</a>
                            </li>
                            <li class="link">
                                <a href="classes/MysqlRawEnvironment.html" data-type="entity-link" >MysqlRawEnvironment</a>
                            </li>
                            <li class="link">
                                <a href="classes/MysqlTypeOrmEnvironment.html" data-type="entity-link" >MysqlTypeOrmEnvironment</a>
                            </li>
                            <li class="link">
                                <a href="classes/RedisEnvironment.html" data-type="entity-link" >RedisEnvironment</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUseCase.html" data-type="entity-link" >RegisterUseCase</a>
                            </li>
                            <li class="link">
                                <a href="classes/State.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="classes/StateInvalidException.html" data-type="entity-link" >StateInvalidException</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApplicationEnvironment.html" data-type="entity-link" >ApplicationEnvironment</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CacheEnvironment.html" data-type="entity-link" >CacheEnvironment</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseEnvironment.html" data-type="entity-link" >DatabaseEnvironment</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpOptions.html" data-type="entity-link" >HttpOptions</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MysqlOptions.html" data-type="entity-link" >MysqlOptions</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RedisOptionsFactory.html" data-type="entity-link" >RedisOptionsFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestMiddleware.html" data-type="entity-link" >RequestMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SwaggerOptions.html" data-type="entity-link" >SwaggerOptions</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BaseUseCase.html" data-type="entity-link" >BaseUseCase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CacheInterface.html" data-type="entity-link" >CacheInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomValidationInterface.html" data-type="entity-link" >CustomValidationInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});