/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    /*var nArray = [];
    if(n == undefined){
      return array[0];
    } else if(n == 0){
      return [];
    } else {
      for(var i = 0; i < n; i++){
        if(array[i] == undefined){
          break;
        }else{
          nArray.push(array[i]);
        }
      }
      return nArray;
    }*/
    if(n == undefined){
      return array[0];
    } else if (n > array.length) {
      return array;
    } else {
      return array.slice(0, n);
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var nArray = [];
    if(n == undefined){
      return array[array.length - 1];
    } else if(n == 0){
      return [];
    } else {
      for(var i = 0; i < n; i++){
        if(array[i] == undefined){
          break;
        }else{
          nArray.unshift(array[array.length - 1 - i]);
        }
      }
      return nArray;
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)){
      for(var i = 0;i < collection.length;i++){
        iterator(collection[i], i, collection);
      }
    } else {
      for(var key in collection){
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    if (Array.isArray(array)){
      for(var i = 0; i < array.length; i++){
        if(array[i] == target){
          return i;
        }
      }
    }else {
      for(var i in array){
        if(array[i] == target){
          return i;
        }
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    for(var i = 0; i < collection.length; i++){
      if(!iterator(collection[i])){
        collection.splice(i, 1);
      }
    }
    return collection;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    for(var i = 0; i < collection.length; i++){
      if(iterator(collection[i])){
        collection.splice(i, 1);
      }
    }
    return collection;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var nArray = [];

    for(var i = 0; i < array.length; i++){
      if(_.indexOf(nArray, array[i]) == -1){
        nArray.push(array[i]);
      }
    }
    return nArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    if(Array.isArray(array)){
      for(var i = 0; i < array.length; i++){
        array[i] = iterator(array[i]);
      }
    } else {
      for(var key in array){
        array[key] = iterator(array[key]);
      }
    }
    return array;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    return _.map(list, function(value){
      return (typeof methodName == "string")?value[methodName](args):methodName.apply(value, args);
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    var total = 0;
    if(initialValue == undefined){
      initialValue = 0;
    }
    for(var i = initialValue; i < collection.length; i++){
      total = iterator(total, collection[i]);
    }
    return total;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    var isIt = false;
    _.each(collection, function(value){
      if(value === target){
        isIt = true;
      }
    });
    return isIt;
    /*return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);*/
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var isIt = true;
      _.each(collection, function(value){
        if(typeof iterator == "function"){
          if(!iterator(value)){
            isIt = false;
          }
        } else {
          if(!value){
            isIt = false;
          }
        }
      });
    return isIt;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var isIt = false;
      _.each(collection, function(value){
        if(typeof iterator == "function"){
          if(iterator(value)){
            isIt = true;
          }
        } else {
          if(value){
            isIt = true;
          }
        }
      });
    return isIt;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for(var i = 1; i < arguments.length; i++){
      for(var key in arguments[i]){
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var i = 1; i < arguments.length; i++){
      for(var key in arguments[i]){
        if(!(key in obj)){
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var cache = [];

    return function(){
      var args = JSON.stringify(arguments);
      if(_.contains(cache, args)){
        return cache[cache.indexOf(args)];
      } else {
        cache.push(args);
        return func.apply(this, arguments);
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var date = new Date();
    var time = date.getTime();
    var start = date.getTime();
    var args = [];
    for(var key in arguments){
      args.push(arguments[key]);
    }
    args = args.slice(2);

    window.setTimeout(function(){func.apply(this, args);}, wait);
    /*
    * setTimeout() is supported by every browser as far as
    * I can tell and there's nothing saying I can't use it
    * so, hey,  why not? It's so easy and obvious that it
    * feels like cheating but I can't figure out another way
    * that isn't basically the same.
    */
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    /*var nArray = array.slice(0);
    for(var i = 0; i <= array.length*100; i++){
      nArray.sort(function(){
        return Math.round(Math.random());
      });
    }
    return nArray;*/
    // ^-- This function tends to keep the high numbers and low numbers on the side they started on.
    // It sucks and uses sort().

    var nArray = array.slice(0);
    var mArray = []
    for(var i = 0; i < array.length; i++){
      var value = Math.floor(Math.random()*nArray.length);
      mArray[i] = nArray[value];
      nArray.splice(value, 1);
    }
    // ^-- This function trends towards even distribution of numbers the more you test it.
    // Way to go, this function.

    return mArray;
  };

  // Tests the randomness of _.shuffle(). Can only be called from console and takes no arguments.
  _.shuffTest = function(){
    var array = [0,1,2,3,4,5,6,7,8,9];

    var oneCount = 0;
    var twentyCount = 0;
    // The idea is if you test it enough times a given spot should see each number fairly evenly.
    // This shuffles array and tests for two arbitrary values in it to see how true that is.

    for(var i = 0; i < 10000; i++){
      var array = _.shuffle(array);
      if(array[0] == 0){
        oneCount++;
      } else if(array[0] == 9) {
        twentyCount++;
      }
    }
    // Calculates if shuffle trends towards even distribution with a 5% margin of error.
    return((oneCount<twentyCount?oneCount/twentyCount > 0.95:twentyCount/oneCount > 0.95) + ": " + (oneCount<twentyCount?oneCount/twentyCount:twentyCount/oneCount));
  }

  //To work with shufftest and make it more versatile mostly, but also it's cool by itself.
  //Calls a specified function n times, memoized, returns array of results.
  //Uses all arguments past n as the arguments for callback.

  //(callback function, number of times to do it [, arguments for callback...])

  _.times = function (callback, n){
    var caller = _.memoize(callback);
    var results = [];
    var args = _.snip(arguments, 2);
    console.log(arguments);
    console.log(args);

    for(var i = 0; i < n; i++){
      results.push(caller.apply(this, args));
    }
    return results;
  }

  // Slice doesn't work on objects. It should and return an array of remaining values because I say so.
  // If just given an object it returns an array of all values because I like working with arrays
  // better for most purposes and... I don't actually know if there's a built in method for this already.

  _.snip = function (obj, starts, stops){
    starts = starts?starts:0;
    stops = stops?stops:Object.keys(obj).length;
    var results = [];
    var current = 0;
    for(key in obj){
      if(current >= starts && current < stops){
        results.push(obj[key]);
      }
      current++;
    }
    return results;
  }

  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    //console.log(typeof iterator + ": " + iterator);
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zippedArray = [];

    // I am so sure there must be a better way to do this...
    var longestArray = 0;
    for (var i = 0; i < arguments.length; i++) {
      if(arguments[i].length > longestArray){
        longestArray = arguments[i].length;
      }
    }

    for(var i = 0; i < longestArray; i++){
      zippedArray.push([]);
      for(var j = 0; j < arguments.length; j++){
        zippedArray[i].push(undefined);
        zippedArray[i] = arguments[j][i];
      }
    }
    return zippedArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    console.log();
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
