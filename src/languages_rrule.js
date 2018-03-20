// Date-related translations
export var DUTCH = {
    dayNames: [
        "zondag",
        "maandag",
        "dinsdag",
        "woensdag",
        "donderdag",
        "vrijdag",
        "zaterdag"
    ],
    monthNames: [
        "januari",
        "februari",
        "maart",
        "april",
        "mei",
        "juni",
        "juli",
        "augustus",
        "september",
        "oktober",
        "november",
        "december"
    ]
    // `tokens` are only needed for `RRule.fromText`
};


// Strings
export var dutchStrings = {
    'every': 'iedere',
    'until': 'tot',
    'first': 'eerste',
    'last': 'laatste',
    'day': 'dag',
    'days': 'dagen',
    'week': 'week',
    'weeks': 'weken',
    'month': 'maand',
    'months': 'maanden',
    'year': 'jaar',
    'years': 'jaar',
    'on': 'op',
    'the': 'de',
    'on the': 'op de',
    'and': 'en',
    'st': 'e',
    'nd': 'e',
    'rd': 'e',
    'th': 'e',
    '(~ approximate)' : '(~ ongeveer)',
    'weekdays' : 'werkdagen',
    'weekenddays' : 'weekenddagen',
};

export var gettext =  function(id) {
    // Return pt. string, default to english.
    return dutchStrings[id] || id;
};
