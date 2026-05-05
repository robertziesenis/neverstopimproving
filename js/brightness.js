var brightnessPercent = 100;

function setDaytimeBrightness() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const totalMinutesInDay = 24 * 60; // 1440 minutes
    const noonMinutes = 12 * 60; // 720 minutes

    // Brightness increases from 0% at midnight to 100% at noon, then decreases back to 0% at midnight
    if (totalMinutes <= noonMinutes) {
        brightnessPercent = (totalMinutes / noonMinutes) * 100;
    } else {
        brightnessPercent = ((totalMinutesInDay - totalMinutes) / noonMinutes) * 100;
    }
    console.log(`Brightness set to ${brightnessPercent.toFixed(2)}% at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`);

    const root = document.documentElement;
    const backgroundGrey = Math.round((brightnessPercent / 100) * 255);
    const textGrey = Math.round((1 - brightnessPercent / 100) * 255);

    root.style.setProperty('--background-color', `rgb(${backgroundGrey}, ${backgroundGrey}, ${backgroundGrey})`);
    root.style.setProperty('--text-color', `rgb(${textGrey}, ${textGrey}, ${textGrey})`);
}

// For Testing: Simulate brightness changes over a 1-minute cycle
function setTestBrightness() {
    const cycleTime = 1 * 60 * 1000; // 1 minute in milliseconds
    const startTime = window.testStartTime || Date.now();
    window.testStartTime = startTime;
    
    const elapsed = Date.now() - startTime;
    const positionInCycle = (elapsed % cycleTime) / cycleTime; // 0 to 1
    
    // Create a sawtooth wave: 0->100->0 over the 1-minute cycle
    if (positionInCycle < 0.5) {
        brightnessPercent = positionInCycle * 2 * 100; // 0% to 100%
    } else {
        brightnessPercent = (1 - positionInCycle) * 2 * 100; // 100% back to 0%
    }
    
    console.log(`Test brightness: ${brightnessPercent.toFixed(2)}%`);

    const root = document.documentElement;
    const backgroundGrey = Math.round((brightnessPercent / 100) * 255);
    const textGrey = Math.round((1 - brightnessPercent / 100) * 255);

    root.style.setProperty('--background-color', `rgb(${backgroundGrey}, ${backgroundGrey}, ${backgroundGrey})`);
    root.style.setProperty('--text-color', `rgb(${textGrey}, ${textGrey}, ${textGrey})`);
}

setDaytimeBrightness();
setInterval(setDaytimeBrightness, 60000); // Update every 60 seconds for smooth transitions