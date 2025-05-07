<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Результат - HTML -->
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <!-- Трансформируем корневой узел <slider> -->
  <xsl:template match="/slider">
    <section class="block-slider">
      <h2 class="slider-title">
        <xsl:value-of select="title"/>
      </h2>
      <div class="slider">
        <button class="prev">
          <svg width="26" height="44" viewBox="0 0 26 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8604 2L3.00001 22.2253L23.2253 41.0857" stroke="#3B3A3E" stroke-width="4" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="slides">
          <xsl:for-each select="products/product">
            <div class="item">
              <img src="{img}" alt="Изображение товара"/>
              <div class="item-text">
                <xsl:value-of select="text"/>
              </div>
              <div class="item-price">
                <xsl:value-of select="price"/>
              </div>
            </div>
          </xsl:for-each>
        </div>
        <button class="next">
          <svg width="25" height="44" viewBox="0 0 25 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.55469 41.1094L22.1094 21.5546L2.55469 1.9999" stroke="#3B3A3E" stroke-width="4" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </section>
  </xsl:template>

</xsl:stylesheet>
