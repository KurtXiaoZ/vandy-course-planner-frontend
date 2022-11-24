// screen type
export const SCREEN = {
    MOBILE: 'MOBILE',
    WEB: 'WEB',
}

export const TEXT = {
    AUTH_PAGE_TITLE: 'Course Planner',
    LAST_VERSION: 'Last Version',
    EXIT: 'Exit',
    PREREQUISITES: 'Prerequisites:',
    COREQUISITES: 'Corequisites:',
    FREQUENCY: 'Frequency:',
    PROFESSORS: 'Professors:',
    OVERALL_QUALITY: 'Overall Quality -- ',
    DIFFICULTY: 'Difficulty -- ',
    DESCRIPTION: 'Description: ',
    UNITS: 'Units: ',
    ENG: 'Eng',
    NON_ENG: 'Non-Eng',
}

export const COURSE_STATUS = {
    SELECTED: 'selected',
    ABLE: 'able',
    NOT_ABLE: 'notable'
}

export const COURSE = {
    RMP: 'https://www.ratemyprofessors.com/professor?tid=',
}

export const TEST_COMPUTER_SCIENCE_CORE = {
    title: 'Computer Science Core',
    description: 'Software/Problem Solving: CS 1101 or 1104; CS 2201, 3251, 3270; Hardware/Systems: EECE 2123/2123L, CS 3281; Foundations: CS 2212, 3250.',
    units: '25 required, 25 taken, 0 needed',
    selected: [
        {
            number: 1101,
            subject: 'CS',
            name: 'Programming and Problem Solving',
        },
        {
            number: 2201,
            subject: 'CS',
            name: 'Data Structures',
        },
    ]
}
export const MAJOR_REQUIREMENTS = {
    'Computer Science Core': {
        description: 'Software/Problem Solving: CS 1101 or 1104; CS 2201, 3251, 3270; Hardware/Systems: EECE 2123/2123L, CS 3281; Foundations: CS 2212, 3250.',
        units: '25 required',
    },
    'Computer Science Project': {
        description: '3 hours to be selected from CS 3259, 3892, 4249, 4269, 4279, or 4287.',
        units: '3 required',
    },
    'Computer Science Depth': {
        description: '12 credit hours to include at least one course selected from CS 4260 or 4278. Remaining hours to be selected from computer science courses numbered 3000 or higher (excluding 3262); EECE 4353, 4354, 4376 and no more than two from MATH 3320, 3620, 4600, 4620. A maximum of 6 hours may come from CS 3860, 3861.',
        units: '12 required',
    },
    'Computer Science Seminar': {
        description: 'CS 4959',
        units: '1 required'
    },
}

export const TEST_CLASS_INFO = {
    number: 1101,
    subject: 'CS',
    name: 'Programming and Problem Solving',
    prereqs: [
        ['CS 1101', 'CS 2201'],
        ['CS 1802'],
        ['CS 1822', 'CS 9321', 'CS 9292'],
    ],
    coreqs: [
        ['CS 1201', 'CS 3891']
    ],
    frequency: 'Spring 2023, Fall 2022, Spring 2022, Fall 2021, Spring 2021',
    professors: [
        {
            name: 'Vikash Singh',
            over_rate: 1.4,
            diff_rate: 3.8,
            tid: 'https://editor.swagger.io/'
        },
        {
            name: 'Vikash Singh',
            over_rate: 4.4,
            diff_rate: 1.8,
            tid: 'https://editor.swagger.io/'
        }
    ]
}