let thisPathToCustomScriptForLogging = `magick-flows-web-root/magick-flows/testing-magick-flows/assets/magick-flows-custom.js`;
let thisCustomScriptDebugInfoStart = `
============================================================
Demuxe: including ${thisPathToCustomScriptForLogging} now...
------------------------------------------------------------
`;
let thisCustomScriptIncludeDebugInfoEnd = `
...end ${thisPathToCustomScriptForLogging}
------------------------------------------------------------
`;
console.group(thisCustomScriptDebugInfoStart);


console.log(`Congratulations! You have included a custom script in your Magick Flow.`);


console.log(thisCustomScriptIncludeDebugInfoEnd);
console.groupEnd();

