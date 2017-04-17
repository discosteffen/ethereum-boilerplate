// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
import setandget_artifacts from '../../build/contracts/SetAndGet.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);
var SetAndGet = contract(setandget_artifacts);

// built in truffle 3.0 webpack. so we have the base metacoin contract.
// need to fix typos in code

var accounts;
var account;
var currentAccount; // need to set this universal in order to switch to other accounts. move this to currentAccount = web3.eth.coibase when needed.
var balanceWei; // needs global
var balance; // needs global
//var balance; // universal
var divState = {}; // for show and hide toggle
var setGetAdd = '0xb073fccbae54c67baffd5ad58302d4b5191a1981';
// function to change account on click menu link
/*function changeAccount(value){
  console.log("calling to change account" + value);
}*/


window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(web3.currentProvider);
    SetAndGet.setProvider(web3.currentProvider);


    // Get the initial account balance so it can be displayed.
      currentAccount = web3.eth.coinbase; // update currentAccount to account 0.

      var value = 'asdasd'; //?

      var accountNew = web3.eth.coinbase; // can probably be removed...  because we are using currentAccount globally

      balanceWei = web3.eth.getBalance(currentAccount).toNumber();
      balance = web3.fromWei(balanceWei, 'ether');

      console.log("wei Balance " + balanceWei);
      console.log("balance " + balance);

      // Stuff to populate when user swaps accounts;
      ethBalance.innerHTML = balance + " Ether";
      accounNr.innerHTML = currentAccount; // this should be getaccount [Number ]

      var number = web3.eth.blockNumber;
      console.log("block number: " + number); // 2744

//      var address = '0xa5f735ab6b25f9f96237b85c78ad0a2e77ea294d'; // contract address
      var address = '0x975bf4e6aed0d7e6b1a9e57f1b421c64917bb623'

//      console.log(SetAndGet.deployed());

      var coinbase = web3.eth.coinbase
      console.log(coinbase)

      var balance = web3.eth.getBalance(coinbase);
      console.log(balance.toString(10));

      var abi = SetAndGet.abi
      var contract = web3.eth.contract(abi).at(address);
      console.log(contract);

      var MyContract = web3.eth.contract(abi);
      var contractInstance = MyContract.at(address);

// this is the one that works.
      var hello = web3.eth.contract(abi).at(address);

//      SO, one of these has to be a constant for the address to be valid. wow...

//            console.log("Title: " + hello.getTitle())

//      console.log("Content: " + hello.getContent.call());

//      var getC = contractInstance.getContent.call();

      // need to get account ID of user. And possibly unlock via web3
      // get balance of that ID
      // make a set transaction for new setter.... this includes ID and data... which is in a binhex

      // sets a new title... once web3.eth.sendTransaction({from: web3.eth.coinbase}, 'test2', 0xF0000)

      /// THE FOLLOWING WORKS:
      // hello.setContent.sendTransaction('to', {from: web3.eth.coinbase})


      web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

	    self.refreshBalance();
	console.log("Everything started just fine");

	console.log(accs);

	//	ethBalance.innerHTML = accounts[0];
  var BigNumber = require('bignumber.js');

	var i;
	var accountBalance;
	var accsLength = accs.length;

  var functionValue;
	var x;
	for(i = 0; i < accsLength; i++){
	    x = new BigNumber(web3.eth.getBalance(accounts[i]));
//            ethBalance.innerHTML += "Account: " + i + " : " + accounts[i] + "<br/> Balance: " + x +  "<br/><br/>";
//            dropdowncontent.innerHTML += "test test test test";
        //    changeAccount(accounts[i]);
            functionValue = accounts[i];
            myDropdown.innerHTML += "Account: " + i + "<br/>" + "<a href='#' onclick='App.updateContent("+i+")'>" + accounts[i] + "</a><br/>";
// onclick of link set default account, opens the info.

  //	    console.log(x.plus(21).toString(10));
	}

/*  Remove if next test works.
function changetest(value){
  console.log("updated account " + value);
} */


//var x = web3.eth.getBalance(accounts[2]);
//console.log(accounts[2] + " " + balance.toString(10)); this just does a quick test.

//	console.log(x);

//	console.log(x.plus(21).toString(10));
//  console.log(web3.eth.getBalance(accounts[1]));




/* Remove if next test works.
	web3.eth.getAccounts((err, acc) => {
	    var status = document.getElementById("ethBalance");
	    console.log(acc);
	    ethBalance.innerHTML = acc;
	});
*/

    });
  },


// update test2 to setContent name... but also needs to combine in contract so there is one contract for both title and content.
// This is important because titles correspond to content..
// also we need to use events(?) to track changes and have a log of it all...
// Also add form verification

unlock: function(){
  web3.personal.unlockAccount(currentAccount, password);
  console.log("unlockbutton");
},

  test2: function(){

//    0xb073fccbae54c67baffd5ad58302d4b5191a1981
    var hello = web3.eth.contract(SetAndGet.abi).at(setGetAdd); // can probably set the address globally

//  	var hello = web3.eth.contract(SetAndGet.abi).at('0x4cf7050d22a7c3418041f418717452af435bca77'); // can probably set the address globally
    // this address is different from Metacoin address. remember each .sol file is a contract when deployed has its own address.
  	var self = this;
  	hello.setContent.sendTransaction(document.getElementById('updateContent').value, {from: web3.eth.coinbase}); // this needs to be currentAccount.
	 //	hello.setContent.sendTransaction('DeluxContent', {from: web3.eth.coinbase});

  	var newcont = hello.getContent.call();
  	console.log("Test function 2" + newcont);
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
      status.innerHTML = message;
  },

  refreshBalance: function() {
    var self = this;
    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(currentAccount, {from: currentAccount}); // need to use current account here.
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

// generic updateContent function for testing...
  updateContent: function(value) {
    currentAccount = accounts[value];
    console.log("current account is: " + currentAccount);
      var testcontent = document.getElementById("testcontent");
      testcontent.innerHTML = "hello";

      balanceWei = web3.eth.getBalance(currentAccount).toNumber();
      balance = web3.fromWei(balanceWei, 'ether'); // balance in ethere.

      accounNr.innerHTML = currentAccount; // this should be getaccount [Number ]
      ethBalance.innerHTML = balance + " Ether";  // what?
      App.refreshBalance();
      App.myFunction();
  },


  accountList: function(){ // should be good to go..
      listAccounts.innerHTML = "";
    for(var i = 0; i<accounts.length; i++){
      //console.log(accounts[i]);
      listAccounts.innerHTML += "Account: " + i + " : " + accounts[i] + "<br/>";
    }
  },


// following test function
// remove when done.
    test: function(){
      var self = this;
      var sng;

	SetAndGet.deployed().then(function(instance) {
            sng = instance;
            console.log("Set And Get is Deployed")

//          console.log(sng.getContent.call())
//	  console.log(sng)
	    return sng.getContent.call();

      }).then(function(result) {
//        var balance_element = document.getElementById("balance");
//        balance_element.innerHTML = value.valueOf();
	  var testVar = sng.getContent();
          console.log("We should get a fullfilled promise of getContent()");
	  console.log(testVar);
//	  sng.getContent();
      }).catch(function(e) {
        console.log(e);
        self.setStatus("Error hmm");
      });

    },

// open menu change variables name
/*  myFunction: function(){
        document.getElementById("myDropdown").classList.toggle("show");
  }, */
/*
  hideMenu: function(){
        document.getElementById("myDropdown").classList.toggle("hide");
  },
*/


// toggle menu buttons. can probably trim this down to one with variable sset later
// toggle menu dropdown
  myFunction: function() {
      var x = document.getElementById('myDropdown');
      if (x.style.display !== 'none') {
          x.style.display = 'none';
      } else {
          x.style.display = 'block';
      }
  },

// this should cover all the basics on show hide... Need to set something as default...
showBtn: function(id) {
    if (document.getElementById) {
        var divid = document.getElementById(id);
        divState[id] = (divState[id]) ? false : true;
        //close others
        for (var div in divState){
            if (divState[div] && div != id){
                document.getElementById(div).style.display = 'none';
                divState[div] = false;
            }
        }
        divid.style.display = (divid.style.display == 'block' ? 'none' : 'block');
    }
},



  sendCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: currentAccount});
    }).then(function() {
      self.setStatus("Transaction complete!");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }



};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
