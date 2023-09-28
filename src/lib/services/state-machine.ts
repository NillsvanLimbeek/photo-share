import { writable, get } from 'svelte/store';

interface Transitions {
	[key: string]: string;
}

interface StateTransitions {
	[key: string]: Transitions;
}

export type State = 'IDLE' | 'LOADING' | 'ERROR';

export function createStateMachine<T extends State>(defaultState: T) {
	const store = writable<T>(defaultState);
	const { subscribe, set } = store;

	const transitions: StateTransitions = {
		IDLE: { LOADING: 'LOADING' },
		LOADING: { ERROR: 'ERROR', IDLE: 'IDLE' },
		ERROR: {}
	};

	function isValidTransition(event: State): boolean {
		return !!transitions[get(store)][event];
	}

	function transition(event: T): void {
		if (!isValidTransition(event)) {
			throw new Error(`Event '${event}' not allowed in current state '${get(store)}'.`);
		}

		set(event);
	}

	return {
		state: { subscribe },
		transition
	};
}
