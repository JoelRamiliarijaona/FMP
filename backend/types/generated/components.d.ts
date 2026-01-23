import type { Schema, Struct } from '@strapi/strapi';

export interface FeatureListItemFeatureListItem extends Struct.ComponentSchema {
  collectionName: 'components_feature_list_item_feature_list_items';
  info: {
    description: '\u00C9l\u00E9ment de la liste de fonctionnalit\u00E9s';
    displayName: 'Feature List Item';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FeaturesFeature extends Struct.ComponentSchema {
  collectionName: 'components_features_features';
  info: {
    description: 'Fonctionnalit\u00E9 de FMP';
    displayName: 'Feature';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface KeyFeatureKeyFeature extends Struct.ComponentSchema {
  collectionName: 'components_key_feature_key_features';
  info: {
    description: 'Fonctionnalit\u00E9 cl\u00E9 avec ic\u00F4ne';
    displayName: 'Key Feature';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    iconName: Schema.Attribute.Enumeration<
      ['Search', 'Settings', 'BarChart3', 'Bell']
    > &
      Schema.Attribute.DefaultTo<'Search'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PlanPlanFeature extends Struct.ComponentSchema {
  collectionName: 'components_plan_plan_features';
  info: {
    description: "Fonctionnalit\u00E9 d'un plan";
    displayName: 'Plan Feature';
  };
  attributes: {
    included: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface StatCardStatCard extends Struct.ComponentSchema {
  collectionName: 'components_stat_card_stat_cards';
  info: {
    description: 'Carte de statistique';
    displayName: 'Stat Card';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    iconName: Schema.Attribute.Enumeration<
      ['Users', 'Shield', 'Clock', 'Wrench']
    > &
      Schema.Attribute.DefaultTo<'Users'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TestimonialTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_testimonial_testimonials';
  info: {
    description: 'T\u00E9moignage client';
    displayName: 'Testimonial';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface WhyChooseItemWhyChooseItem extends Struct.ComponentSchema {
  collectionName: 'components_why_choose_item_why_choose_items';
  info: {
    description: 'Point de la section Pourquoi choisir';
    displayName: 'Why Choose Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'feature-list-item.feature-list-item': FeatureListItemFeatureListItem;
      'features.feature': FeaturesFeature;
      'key-feature.key-feature': KeyFeatureKeyFeature;
      'plan.plan-feature': PlanPlanFeature;
      'stat-card.stat-card': StatCardStatCard;
      'testimonial.testimonial': TestimonialTestimonial;
      'why-choose-item.why-choose-item': WhyChooseItemWhyChooseItem;
    }
  }
}
