import { TestBed, inject } from '@angular/core/testing';

import { CreateUserComponent } from './createUser.component';

describe('a createUser component', () => {
	let component: CreateUserComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CreateUserComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([CreateUserComponent], (CreateUserComponent) => {
		component = CreateUserComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});