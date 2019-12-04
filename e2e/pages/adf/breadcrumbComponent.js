/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

const Util = require('../../util/util');

const BreadcrumbComponent = function () {

    this.selectBreadcrumbName = (name) =>  {
        const breadcrumbName = element(by.cssContainingText('.dw-crumb-fragment', name));
        Util.waitUntilElementIsVisible(breadcrumbName);
        breadcrumbName.click();
    };

    this.getBreadcrumbName = (index) =>  {
        const breadcrumbItems = element.all(by.className('dw-crumb-fragment'));
        return breadcrumbItems.get(index).getText();
    };

    this.getAllCrumbs = () => {
        return element.all(by.className('dw-crumb-fragment'))
            .map((crumbs) => crumbs.getText());
    };
};

module.exports = BreadcrumbComponent;
