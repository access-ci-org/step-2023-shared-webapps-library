<template>
  <div class="calendar-container">
    <vue-cal 
      :events="events"
      @event-click="onEventClick">
    </vue-cal>
    
    <div class="event-popover" v-show="selectedEvent">

      <button @click="closePopover">X</button>
      <h2 v-if="selectedEvent">{{ selectedEvent.title }}</h2>
      <div v-if="selectedEvent">{{ selectedEvent.start.toLocaleString() }} - {{ selectedEvent.end.toLocaleString() }}</div>
      <p style="padding-top: 10px;" v-if="selectedEvent" v-html="selectedEvent.content"></p>
      <small style="margin-top: 20px;" v-if="selectedEvent && selectedEvent.affectedResourceIds">
        <strong>Affected resources:</strong>
        <ul>
          <li v-for="affectedResourceId in selectedEvent.affectedResourceIds" :key="affectedResourceId">
            {{affectedResourceId}}
          </li>
        </ul>
      </small>
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
      this.events = this.newsData.map(news => {
        return {
          start: new Date(news.OutageStart),
          end: new Date(news.OutageEnd),
          title: news.Subject,
          content: news.Content,
          affectedResourceIds: news.AffectedResources.map(({ResourceID}) => ResourceID)
          // description: news.description,
          // Content: news.Content,
          // Start: new Date(news.NewsStart).toLocaleTimeString(),
          // End: new Date(news.NewsEnd).toLocaleTimeString(),

        };
      });
      console.log("Events : ", this.events);
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
    background-color: white;
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

</style>
