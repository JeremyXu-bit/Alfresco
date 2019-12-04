/*
 * Copyright 2005-2018 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { FullNamePipe } from './full-name.pipe';
import { async } from '@angular/core/testing';

describe('FullNamePipe', () => {

    let pipe: FullNamePipe;

    beforeEach(async(() => {
        pipe = new FullNamePipe();
    }));

    it('should return empty string when there is no name', () => {
        const user = {};
        expect(pipe.transform(user)).toBe('');
    });

    it('should return only firstName as fullName when there is no lastName ', () => {
        const user = {firstName : 'Abc'};
        expect(pipe.transform(user)).toBe('Abc');
    });

    it('should return only lastName as fullName when there is no firstName ', () => {
        const user = {lastName : 'Xyz'};
        expect(pipe.transform(user)).toBe('Xyz');
    });

    it('should return fullName when firstName and lastName are available', () => {
        const user = {firstName : 'Abc', lastName : 'Xyz'};
        expect(pipe.transform(user)).toBe('Abc Xyz');
    });
});
