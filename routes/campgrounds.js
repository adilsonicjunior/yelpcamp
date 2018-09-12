var express     = require("express");
var router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var middleware  = require("../middleware/");


router.get("/", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allcampgrounds});
        }
    })
});

router.post("/", middleware.isLoggedIn,function(req, res){
    var name    = req.body.name;
    var price   = req.body.price;
    var image   = req.body.image;
    var desc    = req.body.description;
    var author  = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
   
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
        }
    });
     res.redirect("/campgrounds");
});

router.get("/new", middleware.isLoggedIn, function(req, res){
   //render a form
   res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("deu merda aqui no get id" + err);
        }
        else{
            res.render("campgrounds/show", {campground: foundCampground})
        }
    });
});

//edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

router.put("/:id", middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;