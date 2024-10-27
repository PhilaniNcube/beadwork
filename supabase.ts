export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          created_at: string;
          id: number;
          image_url: string | null;
          name: string;
          parent_category_id: number | null;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image_url?: string | null;
          name: string;
          parent_category_id?: number | null;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          image_url?: string | null;
          name?: string;
          parent_category_id?: number | null;
          slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: "categories_parent_category_id_fkey";
            columns: ["parent_category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      materials: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          price: number;
          product_id: number;
          quantity: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          price: number;
          product_id: number;
          quantity: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          price?: number;
          product_id?: number;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product_details";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone_number: string;
          shipping_address_id: number;
          status: Database["public"]["Enums"]["status"];
          total_amount: number;
          transaction_id: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          first_name: string;
          id?: string;
          last_name: string;
          phone_number: string;
          shipping_address_id: number;
          status?: Database["public"]["Enums"]["status"];
          total_amount: number;
          transaction_id?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          phone_number?: string;
          shipping_address_id?: number;
          status?: Database["public"]["Enums"]["status"];
          total_amount?: number;
          transaction_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_shipping_address_id_fkey";
            columns: ["shipping_address_id"];
            isOneToOne: false;
            referencedRelation: "shipping_addresses";
            referencedColumns: ["id"];
          }
        ];
      };
      product_categories: {
        Row: {
          category_id: number;
          product_id: number;
        };
        Insert: {
          category_id: number;
          product_id: number;
        };
        Update: {
          category_id?: number;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "product_categories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_categories_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product_details";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "product_categories_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      product_images: {
        Row: {
          created_at: string;
          id: number;
          image_url: string;
          is_primary: boolean;
          product_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image_url: string;
          is_primary?: boolean;
          product_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          image_url?: string;
          is_primary?: boolean;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product_details";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      product_materials: {
        Row: {
          material_id: number;
          product_id: number;
        };
        Insert: {
          material_id: number;
          product_id: number;
        };
        Update: {
          material_id?: number;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "product_materials_material_id_fkey";
            columns: ["material_id"];
            isOneToOne: false;
            referencedRelation: "materials";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_materials_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product_details";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "product_materials_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          created_at: string;
          description: string;
          id: number;
          is_featured: boolean;
          price: number;
          search_vector: unknown | null;
          slug: string;
          stock: number;
          title: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: number;
          is_featured?: boolean;
          price?: number;
          search_vector?: unknown | null;
          slug: string;
          stock?: number;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: number;
          is_featured?: boolean;
          price?: number;
          search_vector?: unknown | null;
          slug?: string;
          stock?: number;
          title?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          first_name: string;
          id: string;
          last_name: string;
          updated_at: string | null;
        };
        Insert: {
          first_name: string;
          id: string;
          last_name: string;
          updated_at?: string | null;
        };
        Update: {
          first_name?: string;
          id?: string;
          last_name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          comment: string;
          created_at: string;
          id: number;
          product_id: number;
          profile_id: string;
          rating: number;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: number;
          product_id: number;
          profile_id: string;
          rating: number;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: number;
          product_id?: number;
          profile_id?: string;
          rating?: number;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "product_details";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "reviews_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      shipping_addresses: {
        Row: {
          city: string;
          created_at: string;
          id: number;
          postal_code: string;
          street_address: string;
          user_id: string;
        };
        Insert: {
          city: string;
          created_at?: string;
          id?: number;
          postal_code: string;
          street_address: string;
          user_id: string;
        };
        Update: {
          city?: string;
          created_at?: string;
          id?: number;
          postal_code?: string;
          street_address?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      product_details: {
        Row: {
          price: number | null;
          product_category: string | null;
          product_id: number | null;
          product_images: string[] | null;
          product_slug: string | null;
          stock: number | null;
          title: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      get_order_item_count_and_value: {
        Args: Record<PropertyKey, never>;
        Returns: {
          order_item_id: string;
          item_count: number;
          total_value: number;
        }[];
      };
      get_total_order_value: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      get_total_order_value_by_status: {
        Args: Record<PropertyKey, never>;
        Returns: {
          status: Database["public"]["Enums"]["status"];
          total_value: number;
        }[];
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      search_products: {
        Args: {
          search_term: string;
          limit_count: number;
          offset_count: number;
        };
        Returns: {
          id: number;
          created_at: string;
          slug: string;
          title: string;
          description: string;
          stock: number;
          price: number;
          is_featured: boolean;
        }[];
      };
      search_products_with_images: {
        Args: {
          search_term: string;
          limit_count: number;
          offset_count: number;
        };
        Returns: {
          id: number;
          created_at: string;
          slug: string;
          title: string;
          description: string;
          stock: number;
          price: number;
          is_featured: boolean;
          image_url: string;
        }[];
      };
    };
    Enums: {
      status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
