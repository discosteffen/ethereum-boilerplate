pragma solidity ^0.4.8;

// just a quick get and set contract.
// add timestamps as well.
// match contact names... since this is still not auto in truffle


/* contract main {
    address owner;    // variable owner

    function main() { owner = msg.sender; }     // sets owner of contract

    function kill() { if (msg.sender == owner) selfdestruct(owner); } // kill

    } */

contract SetAndGet {

    // define variables
    string title = "yohello";
    string contentText = "blah blah blah";

    // runs to set title and content

        function setTitle(string _newTitle) public {
	        title = _newTitle;
		    }

    function setContent(string _newContent) public {
          contentText = _newContent;
        }

    // main functions gets
        function getTitle() constant returns (string) {
	        return title;
		    }

    function getContent() constant returns (string) {
          return contentText;
	      }

}
