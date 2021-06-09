<template>
<div>
    <NavigationStalls></NavigationStalls>
    <div class="navspacing">
        <!-- <div class='search-wrapper'>
        <div id='labelText'>Send Newsletter to {{ email }} in <span idf='city-span'> {{ city }} </span></div>
        <input id='email' type="text" v-model='email' placeholder='Sign Up for Email Updates'><button id='emailBtn'>Submit</button>
            <input type="text" id='zipCode' placeholder='Enter Zip Code' v-model='zip'>
        </div> -->

        <div class="search-wrapper d-flex justify-content-center">
            <label for="search">Search Title:</label>
            <input type="text" autocomplete='off'  v-model='keyword' placeholder='Search Title...' name='search'>
        </div>
        <div class="wrapper d-flex justify-content-center">
            <div class='card' v-for='post in filteredList' :key="post">
            <a v-bind:href="post.link" target='blank'>
                <img v-bind:src="post.img" alt=""><small>{{ post.author }}</small>
                {{post.title}}
            
            </a>
            
            <small id='description'>{{ post.description.substring(0,90) }}<small>...</small></small>
            </div>
        </div>
    </div>
</div>
</template>


<script>

import NavigationStalls from '../components/NavigationStalls';

class Post{
  constructor(title, link, author, img, description){
    this.title = title;
    this.link = link;
    this.author = author;
    this.img = img;
    this.description = description;
  }
}

export default {
    components: {
        NavigationStalls,
    },
    data: () => {
        return {
            email: '',
            zip: '',
            city: '',
            keyword: '',
            postList: [
                new Post(
                    'Roasted Chicken Rice', 
                    'https://vuejs.org/', //link to modal
                    '', 
                    'https://vuejs.org//images/logo.png',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada tincidunt dui, non congue odio feugiat volutpat. Ut fermentum vitae nunc vitae pulvinar. Aenean sapien dui, viverra at sapien ut, scelerisque tempus eros. Nullam est ex, dictum non feugiat at, semper a purus.'
                ),
                new Post(
                    'White Chicken Rice', 
                    'https://vuejs.org/', 
                    '', 
                    'https://vuejs.org//images/logo.png',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada tincidunt dui, non congue odio feugiat volutpat. Ut fermentum vitae nunc vitae pulvinar. Aenean sapien dui, viverra at sapien ut, scelerisque tempus eros. Nullam est ex, dictum non feugiat at, semper a purus.'
                ),
                new Post(
                    'Roasted Pork Rice', 
                    'https://vuejs.org/', 
                    '', 
                    'https://vuejs.org//images/logo.png',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada tincidunt dui, non congue odio feugiat volutpat. Ut fermentum vitae nunc vitae pulvinar. Aenean sapien dui, viverra at sapien ut, scelerisque tempus eros. Nullam est ex, dictum non feugiat at, semper a purus.'
                ),
                new Post(
                    'Char Siew Rice', 
                    'https://vuejs.org/', 
                    '', 
                    'https://vuejs.org//images/logo.png',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada tincidunt dui, non congue odio feugiat volutpat. Ut fermentum vitae nunc vitae pulvinar. Aenean sapien dui, viverra at sapien ut, scelerisque tempus eros. Nullam est ex, dictum non feugiat at, semper a purus.'
                ),
                new Post(
                    'Roasted Pork and Char Siew Rice', 
                    'https://vuejs.org/', 
                    '', 
                    'https://vuejs.org//images/logo.png',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada tincidunt dui, non congue odio feugiat volutpat. Ut fermentum vitae nunc vitae pulvinar. Aenean sapien dui, viverra at sapien ut, scelerisque tempus eros. Nullam est ex, dictum non feugiat at, semper a purus.'
                ),
            ]
        }
    },
    computed: {
        filteredList(){
            return this.postList.filter(post => post.title.toLowerCase().includes(this.keyword.toLowerCase()));
        }
    }
}

</script>
