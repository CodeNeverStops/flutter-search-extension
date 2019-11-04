const rootPath = "https://api.flutter.dev/";

var weights = {
    'library': 2,
    'class': 2,
    'typedef': 3,
    'method': 4,
    'accessor': 4,
    'operator': 4,
    'property': 4,
    'constructor': 4
};

function search(q) {
    var allMatches = [];

    function score(element, num) {
        num -= element.overriddenDepth * 10;
        var weightFactor = weights[element.type] || 4;
        return { e: element, score: (num / weightFactor) >> 0 };
    }

    for (var i = 0; i < searchIndex.length; i++) {
        var element = searchIndex[i];
        var lowerName = element.name.toLowerCase();
        var lowerQualifiedName = element.qualifiedName.toLowerCase();
        var lowerQ = q.toLowerCase();
        var previousMatchCount = allMatches.length;

        if (element.name === q || element.qualifiedName === q) {
            allMatches.push(score(element, 2000));
        } else if (element.name === 'dart:' + q) {
            allMatches.push(score(element, 2000));
        } else if (lowerName === 'dart:' + lowerQ) {
            allMatches.push(score(element, 1800));
        } else if (lowerName === lowerQ || lowerQualifiedName === lowerQ) {
            allMatches.push(score(element, 1700));
        }

        if (q.length <= 2) {
            break;
        }

        if (element.name.indexOf(q) === 0 || element.qualifiedName.indexOf(q) === 0) {
            allMatches.push(score(element, 750));
        } else if (lowerName.indexOf(lowerQ) === 0 || lowerQualifiedName.indexOf(lowerQ) === 0) {
            allMatches.push(score(element, 650));
        } else if (element.name.indexOf(q) >= 0 || element.qualifiedName.indexOf(q) >= 0) {
            allMatches.push(score(element, 500));
        } else if (lowerName.indexOf(lowerQ) >= 0 || lowerQualifiedName.indexOf(lowerQ) >= 0) {
            allMatches.push(score(element, 400));
        }
    }

    allMatches.sort(function (a, b) {
        var x = b.score - a.score;
        if (x === 0) {
            return a.e.name.length - b.e.name.length;
        } else {
            return x;
        }
    });

    var sortedMatches = [];
    for (var j = 0; j < allMatches.length; j++) {
        var e = allMatches[j].e;
        e.url = `${rootPath}flutter/${e.href}`;
        sortedMatches.push(e);
    }

    return sortedMatches;
}

window.rootPath = rootPath;
window.search = search;