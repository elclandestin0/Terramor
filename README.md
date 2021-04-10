# Terramor
## Overview
Welcome to Terramor! This decentralized application is made with React, Solidity and love. It allows the user to explore, scan, earn TerraCoins and enjoy the landmarks around them! The TerraCoin is powered by the [ERC20 standard from OZ](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20) and is deployed on the Rinkeby TestNet, so it has no real world value. [Demonstration of the app can be found here.](https://www.youtube.com/watch?v=xBLWArsydFE)

## Components
![TopNavBar](https://www.dropbox.com/s/jbbqfx9htdvaxj1/Camera.png?dl=1)
The top navigational bar shows the address currently being used by web3 on the top left, while the top right shows the account balance in TerraCoins of the respective account.  

To see the Landmarks around you, head on over to the map page. It is the index page you begin with but you can also find it on the left button in the bottom navigational bar. Tapping on the markers will show you an image along with how much the Landmark is worth in TerraCoins. 

The list button on the right side of the bottom navigational bar shows all the Landmarks that are available to be scanned. Scrolling to the bottom will show the “Add Landmark” button, which takes you the page with the same respective name. You must be the manager of the Landmark Factory in order to add your own Landmarks. Here, you fill out the name, latitude, longitude, address, image URL and token worth of the Landmark. 

Clicking add will first create the Landmark, which is a transaction. After successfully creating the Landmark, the master account will deploy the token worth * 10 in coins to the Landmark address, which is another transaction. When that passes, a QR code is generated and you can save it (screenshot for now) for use. 

Finally, the middle button is the camera for, you guessed it, the QR Code scanner!When the user finds the Landmark QR code, they can scan it for the predetermined token worth! The QR codes in the test run were placed in areas where the users can enjoy the view, as demonstrated by Adham here.