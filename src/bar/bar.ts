WA.onInit().then(() => {
    const mapButtons: { [key: string]: string } = {
        bronze: 'map_bronze.tmj',
        silver: 'map_silver.tmj',
        gold: 'map_gold.tmj'
    };

    Object.keys(mapButtons).forEach(key => {
        const button = document.getElementById(key);
        button?.addEventListener('click', async () => {
            const mapName = mapButtons[key];
            WA.nav.goToRoom(`https://play.workadventu.re/_/0dmztclzsjv5/67b0-46-193-57-71.ngrok-free.app/${mapName}`);
        });
    });
});
