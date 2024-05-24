import {getTabs} from "../util/getTabs";
import {focusTab} from "../util/focusTab";


let currentActiveTabs = await getTabs()
const pattern = /Meet -/;
const matchedTabs = currentActiveTabs.filter((tab: any) => pattern.test(tab.title));
if (matchedTabs.length > 0) {
    await focusTab(matchedTabs[0].url);
} {
    console.log('no matching tabs found')
}
