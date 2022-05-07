import { TestBed, inject } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('a menu component', () => {
	let component: MenuComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MenuComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([MenuComponent], (MenuComponent) => {
		component = MenuComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});