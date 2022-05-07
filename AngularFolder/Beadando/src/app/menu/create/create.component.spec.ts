import { TestBed, inject } from '@angular/core/testing';

import { CreateComponent } from './create.component';

describe('a create component', () => {
	let component: CreateComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CreateComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([CreateComponent], (CreateComponent) => {
		component = CreateComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});