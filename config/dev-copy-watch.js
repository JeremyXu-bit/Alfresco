const cpx = require('cpx');

//Workaround for https://github.com/angular/angular-cli/issues/8783
//we copy before the files in dist-dev-temp in the demo shell and after we let the angular cli watch over them..double wathh necessary for dev mode

cpx.watch('../alfresco-ng2-components/lib/core/prebuilt-themes/**/*.*', './dist-dev-temp/assets/prebuilt-themes')
cpx.watch('../alfresco-ng2-components/lib/core/assets/**/*.*', './dist-dev-temp/assets/' )
cpx.watch('../alfresco-ng2-components/lib/process-services/assets/**/*.*', './dist-dev-temp/assets/' )
cpx.watch('../alfresco-ng2-components/lib/content-services/assets/**/*.*', './dist-dev-temp/assets/' )

cpx.watch('../alfresco-ng2-components/lib/core/i18n/**/*.*', './dist-dev-temp/assets/adf-core/i18n' )
cpx.watch('../alfresco-ng2-components/lib/process-services/i18n/**/*.*', './dist-dev-temp/assets/adf-process-services/i18n' )
cpx.watch('../alfresco-ng2-components/lib/content-services/i18n/**/*.*', './dist-dev-temp/assets/adf-content-services/i18n' )
cpx.watch('../alfresco-ng2-components/lib/insights/i18n/**/*.*', './dist-dev-temp/assets/adf-insights/i18n' )