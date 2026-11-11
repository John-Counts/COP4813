
async function load_json_data() {
  try {
    const response = await fetch('../assets/json/carrion_feeder.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Populate text content
    document.getElementById('card_title').textContent = data.title;
    document.getElementById('mana_cost').textContent = data.mana_cost;
    document.getElementById('card_type').textContent = data.type;
    document.getElementById('card_subtype').textContent = data.subtype;
    document.getElementById('card_set').textContent = data.set_symbol;
    document.getElementById('card_text').textContent = data.card_text;
    document.getElementById('flavor_text').textContent = data.flavor;
    document.getElementById('illustrator').textContent = data.illustrator;
    document.getElementById('power').textContent = data.power;
    document.getElementById('toughness').textContent = data.toughness;

    // Populate image source and accessibility text
    const image_element = document.getElementById('card_image');
    image_element.src = data.image_url;
    image_element.alt = data.alt_text;
    image_element.style.display = 'block';

  } catch (error) {
    console.error('Error fetching JSON data:', error);
    document.getElementById('card_title').textContent = 'Failed to load content';
  }
}

load_json_data();
