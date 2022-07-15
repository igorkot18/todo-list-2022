<template>
  <footer class='footer'>
      <div class='footer__info'>
        <span>{{`©2015-${currentYear} Success Craft`}}</span>
      </div>
    </footer>
</template>

<script>
import './footer.scss';

export default {
  name: 'FooterComponent',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
}
</script>