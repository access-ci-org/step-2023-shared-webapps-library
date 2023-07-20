<template>
  <div class="calendar-container">
    <vue-cal 
      :events="events"
      @event-click="onEventClick">
      <template #event-render="{ event }">
        <div>
          {{ event.title }}
        </div>
      </template>
    </vue-cal>
    
    <div class="event-popover" v-show="selectedEvent">

      <button @click="closePopover">X</button>
      <h2 v-if="selectedEvent">{{ selectedEvent.title }}</h2>
      <p v-if="selectedEvent">{{ selectedEvent.Start }} - {{ selectedEvent.End }}</p>
      <div v-if="selectedEvent" v-html="selectedEvent.Content"></div>

    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import axios from 'axios';

export default {
  components: {
    VueCal,
  },
  data() {
    return {
      events: [],
      selectedEvent: null
    }
  },

  methods: {
    onEventClick(event) {
      this.selectedEvent = event;
    },
    closePopover() {
      this.selectedEvent = null;
    }
  },

  async created() {
    try {
      const response = await axios.get(
        'https://operations-api.access-ci.org/wh2/news/v1/affiliation/access-ci.org/'
      );
      console.log(response.data);
      this.newsData = response.data.results;
      this.events = this.newsData.map(news => ({
        start: new Date(news.NewsStart),
        end: new Date(news.NewsEnd),
        title: news.Subject,
        description: news.description,
        Content: news.Content,
        Start: new Date(news.NewsStart).toLocaleTimeString(),
        End: new Date(news.NewsEnd).toLocaleTimeString(),

      }));
      console.log(this.events);
    } catch (error) {
      console.error(error);
    }
  },
}
</script>

<style scoped>
 .calendar-container {
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    color:white;
  }
.event-popover {
  position:absolute;
  top:50%;
  left:50%;
  transform : translate(-50%,-50%);
  background:white;
  padding :20px;
  border-radius :10px;
  box-shadow :0px 2px 8px rgba(0,0,0,0.2);
  color:black;
  z-index: 9999;
}
.event-popover button {
  position:absolute;
  top :10px;
  right :10px;
}
.vuecal {
  width: 100%;
  height: 100%;
}
</style>
