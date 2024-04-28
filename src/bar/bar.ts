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

            let host = window.location.host;
            const instanceId = Math.random().toString(36).substring(2, 15);
            let url = `https://play.workadventu.re/_/${instanceId}/${host}/map-starter-kit/${mapName}`;

            if (host === 'localhost') {
                url = `https://play.workadventu.re/_/${instanceId}/${host}/${mapName}`;
            }
            WA.nav.goToRoom(url);
            //WA.nav.goToRoom(`https://play.workadventu.re/_/ixta2r3w9p/2d8f-77-132-167-143.ngrok-free.app/${mapName}`);
        });
    });
});

export {};