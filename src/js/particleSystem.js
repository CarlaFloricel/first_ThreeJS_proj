/* author: Andrew Burks */
"use strict";

/* Get or create the application global variable */
var App = App || {};

const ParticleSystem = function() {

    // setup the pointer to the scope 'this' variable
    const self = this;

    // data container
    self.data = [];

    // scene graph group for the particle system
    const sceneObject = new THREE.Group();

    const gui = new dat.GUI();

    // bounds of the data
    const bounds = {};

    var sliceInfo;

    var slice;

    var particleSystem;

    var filterSystem ;


    self.createSliceSystem = function(position) {

        var width = d3.select('.particleDiv').node().clientWidth/60;
        var height = width;
        var sliceGeo = new THREE.PlaneGeometry(12,12);
        var sliceMat = new THREE.MeshBasicMaterial({
            color:'#ffffff'
        });

        var sliceParticleGeo = new THREE.Geometry();
        var sliceParticleMat = new THREE.PointsMaterial({
            sizeAttenuation:false,
            vertexColors:true
        });

        for (var i = 0; i< self.data.length; i++) {
            if(self.data[i].Y >= position &&  self.data[i].Y < position+0.5){
                var posX = self.data[i].X;
                var posY =  self.data[i].Y;
                var posZ = self.data[i].Z;
                var part = new THREE.Vector3(posX, -posZ, 2);
                var con=self.data[i].concentration;

                if(con < 0.0001){
                    sliceParticleGeo.colors.push(new THREE.Color('#f7fcfd'));
                } else if(con<0.001){
                     sliceParticleGeo.colors.push(new THREE.Color('#e0ecf4'));
                 } else if(con < 0.01){
                    sliceParticleGeo.colors.push(new THREE.Color('#bfd3e6'));
                } else if (con < 0.1){
                    sliceParticleGeo.colors.push(new THREE.Color('#9ebcda'));
                } else if(con <0){
                    sliceParticleGeo.colors.push(new THREE.Color('#8c96c6'));
                } else if (con < 1){
                    sliceParticleGeo.colors.push(new THREE.Color('#8c6bb1'));
                } else if(con <10){
                    sliceParticleGeo.colors.push(new THREE.Color('#88419d'));
                } else if(con <20){
                    sliceParticleGeo.colors.push(new THREE.Color('#810f7c'));
                } else {
                    sliceParticleGeo.colors.push(new THREE.Color('#4d004b'));
                }
                
                sliceParticleGeo.vertices.push(part);
            } 
        }
       
        slice= new THREE.Mesh(sliceGeo, sliceMat);
        slice.position.x=d3.select('.particleDiv').node().clientWidth/50;
        // slice.rotation.x=10;

         sliceInfo= new THREE.Points(
            sliceParticleGeo,
            sliceParticleMat
        );
        
        slice.position.y=-height/3;
        sliceInfo.position.y=-height/3+1;
        sliceInfo.position.x=d3.select('.particleDiv').node().clientWidth/50-2.2;
        sceneObject.add(sliceInfo);
        sceneObject.add(slice);
    };

    self.createFilterSystem = function() {

        var filterGeo = new THREE.PlaneGeometry(12,12);
        var filterMat = new THREE.MeshBasicMaterial({
            color:'#000000'
        });

        filterSystem = new THREE.Mesh(filterGeo, filterMat);
        filterSystem.position.y=-0.8;
        filterSystem.rotation.x=-30;

        var f2=gui.addFolder('Slide Filter to see 2D section');
        f2.add(filterSystem.position, 'y', -0.8,bounds.maxY+1).onChange(function(){
            sceneObject.remove(sliceInfo);
            sceneObject.remove(slice);
            self.createSliceSystem(filterSystem.position.y);
            updateColors(filterSystem.position.y);
            
            })
        
        sceneObject.add(filterSystem);

     };


     function updateColors(val){
        if(val==-0.8){
            for (var i = 0; i< particleSystem.geometry.vertices.length; i++) {
                var con=self.data[i].concentration;
                
                if(particleSystem.geometry.vertices[i].y >= val){
                    if(con < 0.0001){
                        particleSystem.geometry.colors[i].set('#f7fcfd');
                    } else if(con< 0.001){
                         particleSystem.geometry.colors[i].set('#e0ecf4');
                     } else if(con < 0.01){
                        particleSystem.geometry.colors[i].set('#bfd3e6');
                    } else if (con < 0.1){
                        particleSystem.geometry.colors[i].set('#9ebcda');
                    } else if(con < 0){
                        particleSystem.geometry.colors[i].set('#8c96c6');
                    } else if (con < 1){
                        particleSystem.geometry.colors[i].set('#8c6bb1');
                    } else if(con < 10){
                        particleSystem.geometry.colors[i].set('#88419d');
                    } else if(con < 20){
                        particleSystem.geometry.colors[i].set('#810f7c');
                    } else {
                        particleSystem.geometry.colors[i].set('#4d004b');
                    }

                }
            }
        } else {
            for (var i = 0; i< particleSystem.geometry.vertices.length; i++) {
                var con=self.data[i].concentration;
                
                if(particleSystem.geometry.vertices[i].y >= val-0.2 && particleSystem.geometry.vertices[i].y <= val+0.2 ){
                    if(con < 0.0001){
                        particleSystem.geometry.colors[i].set('#f7fcfd');
                    } else if(con< 0.001){
                         particleSystem.geometry.colors[i].set('#e0ecf4');
                     } else if(con < 0.01){
                        particleSystem.geometry.colors[i].set('#bfd3e6');
                    } else if (con < 0.1){
                        particleSystem.geometry.colors[i].set('#9ebcda');
                    } else if(con < 0){
                        particleSystem.geometry.colors[i].set('#8c96c6');
                    } else if (con < 1){
                        particleSystem.geometry.colors[i].set('#8c6bb1');
                    } else if(con < 10){
                        particleSystem.geometry.colors[i].set('#88419d');
                    } else if(con < 20){
                        particleSystem.geometry.colors[i].set('#810f7c');
                    } else {
                        particleSystem.geometry.colors[i].set('#4d004b');
                    }

                } else {
                   
                
                        if(con < 0.0001){
                            particleSystem.geometry.colors[i].set('#f0f0f0');
                        } else if(con< 0.001){
                            particleSystem.geometry.colors[i].set('#d9d9d9');
                         } else if(con < 0.01){
                           particleSystem.geometry.colors[i].set('#d9d9d9');
                        } else if (con < 0.1){
                            particleSystem.geometry.colors[i].set('#bdbdbd');
                        } else if(con < 0){
                            particleSystem.geometry.colors[i].set('#969696');
                        } else if (con < 1){
                            particleSystem.geometry.colors[i].set('#737373');
                        } else if(con < 10){
                           particleSystem.geometry.colors[i].set('#525252');
                        } else if(con < 20){
                            particleSystem.geometry.colors[i].set('#252525');
                        } else {
                            particleSystem.geometry.colors[i].set('#000000');}
                } 
             } 
         }
            particleSystem.geometry.colorsNeedUpdate=true;
        

     };

    // creates the particle system
    self.createParticleSystem = function() {

        // use self.data to create the particle system
        // draw your particle system here!
        var particleGeo = new THREE.Geometry();
        var particleMat = new THREE.PointsMaterial({
            sizeAttenuation:false,
            vertexColors:true
        });
       
        for (var i = 0; i< self.data.length; i++) {
            var posX = self.data[i].X;
            var posY = self.data[i].Y;
            var posZ = self.data[i].Z;
            var particle = new THREE.Vector3(posX, posY, posZ);
            var con=self.data[i].concentration;

            if(con < 0.0001){
                particleGeo.colors.push(new THREE.Color('#f7fcfd'));
            } else if(con< 0.001){
                 particleGeo.colors.push(new THREE.Color('#e0ecf4'));
             } else if(con < 0.01){
                particleGeo.colors.push(new THREE.Color('#bfd3e6'));
            } else if (con < 0.1){
                particleGeo.colors.push(new THREE.Color('#9ebcda'));
            } else if(con < 0){
                particleGeo.colors.push(new THREE.Color('#8c96c6'));
            } else if (con < 1){
                particleGeo.colors.push(new THREE.Color('#8c6bb1'));
            } else if(con < 10){
                particleGeo.colors.push(new THREE.Color('#88419d'));
            } else if(con < 20){
                particleGeo.colors.push(new THREE.Color('#810f7c'));
            } else {
                particleGeo.colors.push(new THREE.Color('#4d004b'));
            }
            
            particleGeo.vertices.push(particle);
        }

         particleSystem = new THREE.Points(
            particleGeo,
            particleMat
        );
        sceneObject.add(particleSystem);

        var f1=gui.addFolder('Rotate Cylinder');
        f1.add(particleSystem.rotation, 'y', 0,2*Math.PI).onChange(function(){
            sliceInfo.rotation.z=particleSystem.rotation.y;
        })
        f1.add(particleSystem.rotation, 'x', 0,2*Math.PI).onChange(function(){
        })
        f1.add(particleSystem.rotation, 'z', 0,2*Math.PI).onChange(function(){
        })

        
    };


    // data loading function
    self.loadData = function(file){

        // read the csv file
        d3.csv(file)
        // iterate over the rows of the csv file
            .row(function(d) {

                // get the min bounds
                bounds.minX = Math.min(bounds.minX || Infinity, d.Points0);
                bounds.minY = Math.min(bounds.minY || Infinity, d.Points2);
                bounds.minZ = Math.min(bounds.minZ || Infinity, d.Points1);

                // get the max bounds
                bounds.maxX = Math.max(bounds.maxX || -Infinity, d.Points0);
                bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Points2);
                bounds.maxZ = Math.max(bounds.maxZ || -Infinity, d.Points1);

                // add the element to the data collection
                self.data.push({
                    // concentration density
                    concentration: Number(d.concentration),
                    // Position
                    X: Number(d.Points0),
                    Y: Number(d.Points2),
                    Z: Number(d.Points1),
                    // Velocity
                    U: Number(d.velocity0),
                    V: Number(d.velocity2),
                    W: Number(d.velocity1)
                });
            })
            // when done loading
            .get(function() {
                
                // create the particle system
                self.createFilterSystem();
                self.createParticleSystem();
                self.createSliceSystem(filterSystem.position.y);
            });


    };

    // publicly available functions
    self.public = {

        // load the data and setup the system
        initialize: function(file){
            self.loadData(file);

        },

        // accessor for the particle system
        getParticleSystems : function() {
            self.createSliceSystem();
            return sceneObject;
        }
    };

    return self.public;

};