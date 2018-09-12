var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name:"Campground 1",
        image:"http://campcolorado.com/wp-content/uploads/campground-area-photo-6-600x400.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 1"
    },
    {
        name:"Campground 2",
        image:"https://bdn-data.s3.amazonaws.com/uploads/2015/09/10016241_H15812449-600x400.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 2"
    },
    {
        name:"Campground 3",
        image:"https://bdn-data.s3.amazonaws.com/uploads/2016/04/CampgroundHosts042816-1-600x400.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 3"
    }
];

function seedDB(){
    //remove campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Campgrounds have been removed");
        //add campgrounds after remove
        data.forEach(function(seed){
        Campground.create(seed, function (err, campground){
            if(err){
                console.log("error on creating campgrounds: " + err);
            }
            else{
                console.log("added a campground");
                //create a comment
                Comment.remove({}, function(err){
                    if(err){
                        console.log(err);
                    }
                    Comment.create({
                        comment: "Nice but Not",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log("error on commenting: " + comment);
                        }
                        else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("new comment created");
                        }
                    })
                })
            }
        });
    });
    });
    
    //add campgrounds
    
}

module.exports = seedDB;