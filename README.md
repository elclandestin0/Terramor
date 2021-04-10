# Terramor
## Overview
Welcome to Terramor! This decentralized application is made with React, Solidity and love. It allows the user to explore, scan, earn TerraCoins and enjoy the landmarks around them! The TerraCoin is powered by the [ERC20 standard from OZ](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20) and is deployed on the Rinkeby TestNet, so it has no real world value. [Demonstration of the app can be found here.](https://www.youtube.com/watch?v=xBLWArsydFE)

## Components
The top navigational bar shows the address currently being used by web3 on the top left, while the top right shows the account balance in TerraCoins of the respective account.

![Top Nav Bar](https://uc32d5de5d4372371e8878319b08.dl.dropboxusercontent.com/cd/0/inline/BMVGn4qWRKOO4BfgLQttnUpdn6MNfYsqOcIJD6Z1Z4n979oj2KIGnflRZ9GVRD037hl43S_TqhtgfbD_tYCUMTXjyPxnmYqHgEjPdqZKQCekl2Nldvmqudi1fWpd1_Xo1zYyAlvHWFw5btMvjxA8itr6/file#)

To see the Landmarks around you, head on over to the map page. It is the index page you begin with but you can also find it on the left button in the bottom navigational bar. 

![Map](https://uc0c0e0d32c4f90dd73f8e4bfea9.dl.dropboxusercontent.com/cd/0/inline/BMUO2vv3vt-4RLAW9xsry-FAJknxvcI5aSY4RCUw5gmpDsQfZdxVuVH1heB6TiWfSm-hJW-2KUMh2RmwOwezskSN_0cxAPc0mIvvLAAO2FHzSruFH-t7CQXQl0vVd6U68PTGrLWzt-OJh-fA-aoyggRS/file#)

Tapping on the markers will show you an image along with how much the Landmark is worth in TerraCoins. 

![Popup](https://ucd4d7758001c8816024f12da527.dl.dropboxusercontent.com/cd/0/inline/BMW5r8_v4q6ZtlqnKbAwlar3EiyTvxq0RSN2gE3w1yqeIpARMeeYnoJuKUGwmDWCPbfMRbCIKLKJ9g46TW5GpZOOXEhQkCYMg5R-rICLLm4zsO42rZd1WtwumriC1mdR_CwPr9bwhqDFF8mR282gXK2R/file#)


The list button on the right side of the bottom navigational bar shows all the Landmarks that are available to be scanned.

![List](https://uc87bbb438636b17a11cbe2c2feb.dl.dropboxusercontent.com/cd/0/inline/BMWZsKf8W2wHadytg-d5lXeIeP-xrj7ACnrjy88BU6e1elsg4Wvf84DgQuEpGlJsmsOA5-P1ahUJls40s-GeAnY3jjqaX4ttQE0EH0iPafMPV_ifI0I6J4drNGAS9ZjZ-laPp4xseEh7TDwH2M7s8nFO/file#)

Scrolling to the bottom will show the “Add Landmark” button, which takes you the page with the same respective name. You must be the manager of the Landmark Factory in order to add your own Landmarks. Here, you fill out the name, latitude, longitude, address, image URL and token worth of the Landmark.

![Creating A Landmark](https://ucb937ddf74c6471325a986eceea.dl.dropboxusercontent.com/cd/0/inline/BMUFnL4aAFqMeox13nrZWDCcwExgXmVYqTpxJQiwX6MZL_dGYUmgxkrtRMc_W6H_nRESrjtEOvweSLvfqyG_tncYvgyeUKshzgUU-xlaQ-apyXR7r9vMa3x9Dszz3XhReu_lDfk6CWlT0SdQP97hUa-A/file#)

Clicking add will first create the Landmark, which is a transaction. After successfully creating the Landmark, the master account will deploy the token worth * 10 in coins to the Landmark address, which is another transaction. 

![Transfer coins](https://uc4839e06a582226ae94e35fb3ee.dl.dropboxusercontent.com/cd/0/inline/BMXOixHR9vtPv5yLCzYqbmGmDj-7A97zaTM1aXWsY7dNDCfaxPi4Q04RogkpSxrGfQ9hqaPt-7DYXYa6c-RKwkdLPjFJ0l52hb1_9f_2pAQxIS2i1WZPdZxfJ8i2lj8peP-Zm_IDDz7Vw_-Xmf1GJEFR/file#)

When that passes, a QR code is generated and you can save it (screenshot for now) for use.

![QR Code Generated](https://uccc1351f4dacc293a34e3cf3121.dl.dropboxusercontent.com/cd/0/inline/BMUsGes6DLcJhquznaQRQAnj_ztv9BZJrRwGMRdxcxN0izNVCdE2Er_IWuan4oPM3vBemBvM4b797NUtnb6MZnRDY94D2-dOFcK-V4VgTll1sYY1L_hFMz0-hbXejHOVx0DSqbvHTNb2K4BiPatWIp7g/file#)

Finally, the middle button is the camera for, you guessed it, the QR Code scanner! 
When the user finds the Landmark QR code, they can scan it for the predetermined token worth!

![Scanning QRCode](qrcodescanner.gif)

 The QR codes in the test run were placed in areas where the users can enjoy the view, as demonstrated by Adham here.

 ![Adham enjoying view](adham.gif)
