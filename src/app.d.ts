// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	type CourseInfo = {
		area: string;
		code: string;
		name: string;
		level?: string;
		description?: string;
		parameters?: string;
	};

	type Prereqs = CourseInfo[];

	type SubOutcome = {
		num: number;
		specific: number;
		general: number;
		text: string;
	};

	type SpecificOutcome = {
		text: string;
		num: number;
		general: number;
		subs: SubOutcome[];
	};

	type GeneralOutcome = {
		text: string;
		num: number;
		specifics: SpecificOutcome[];
		combinedOutcome?: CombinedOutcomeName;
	};

	type Weight = {
		outcome: CombinedOutcome;
		outcomeName: CombinedOutcomeName;
		value: number;
		area?: string;
		code?: string;
		generals?: number[];
	};

	export enum CombinedOutcome {
		NONE = 0,
		KU,
		PAE,
		CCC
	}

	type CombinedOutcomeName = keyof typeof CombinedOutcome;

	type Course = {
		info: CourseInfo;
		prereqs: Prereqs;
		outcomes?: GeneralOutcome[];
		weights: Weight[];
	};
}

export {};
