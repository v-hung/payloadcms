"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useField, useFormFields, Button, FieldLabel } from "@payloadcms/ui";
import type { ArrayFieldClientProps } from "payload";
import type { Product } from "@/types/payload-types";
import { ChevronDown, ChevronRight } from "lucide-react";

type Variant = NonNullable<Product["variants"]>[number];
type SelectedOption = NonNullable<Variant["selectedOptions"]>[number];

export const ProductVariantsField: React.FC<ArrayFieldClientProps> = (
  props,
) => {
  const { path } = props;
  const { value, setValue } = useField<Product["variants"]>({ path });
  const variants = useMemo(() => value || [], [value]);

  const optionsField = useFormFields(
    ([fields]) => fields.options?.value,
  ) as Product["options"];
  const options = useMemo(() => optionsField || [], [optionsField]);

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [expandedVariants, setExpandedVariants] = useState<Set<number>>(
    new Set(),
  );

  const getDisplayText = useCallback(
    (
      text: string | { en?: string; vi?: string } | null | undefined,
    ): string => {
      if (!text) return "";
      if (typeof text === "string") return text;
      return text?.en || text?.vi || "";
    },
    [],
  );

  const generateVariants = useCallback(() => {
    if (options.length === 0) {
      setValue([]);
      return;
    }

    const combinations: SelectedOption[][] = [];

    const generate = (index: number, current: SelectedOption[]) => {
      if (index === options.length) {
        combinations.push([...current]);
        return;
      }

      const option = options[index];
      const optionName = option.name;

      if (
        option.values &&
        Array.isArray(option.values) &&
        option.values.length > 0
      ) {
        for (const val of option.values) {
          current.push({
            option: optionName,
            value: val.label,
            id: `opt-${Date.now()}-${Math.random()}`,
          });
          generate(index + 1, current);
          current.pop();
        }
      } else {
        generate(index + 1, current);
      }
    };

    generate(0, []);

    const newVariants: Variant[] = combinations.map((selectedOptions) => {
      const titleParts = selectedOptions.map((opt) =>
        getDisplayText(opt.value),
      );
      const title = titleParts.join(" / ");

      const existing = variants.find((v) => {
        if (v.selectedOptions.length !== selectedOptions.length) return false;
        return selectedOptions.every((opt, i) => {
          const vOpt = v.selectedOptions[i];
          return (
            getDisplayText(vOpt.option) === getDisplayText(opt.option) &&
            getDisplayText(vOpt.value) === getDisplayText(opt.value)
          );
        });
      });

      return (
        existing || {
          title,
          selectedOptions,
          price: 0,
          inventory: 0,
          available: true,
          id: `variant-${Date.now()}-${Math.random()}`,
        }
      );
    });

    setValue(newVariants);
  }, [options, variants, setValue, getDisplayText]);

  const groupedVariants = useMemo(() => {
    if (options.length === 0 || variants.length === 0) return {};

    const groups: Record<
      string,
      Array<Variant & { originalIndex: number }>
    > = {};

    variants.forEach((variant, index) => {
      const firstSelected = variant.selectedOptions[0];
      const groupKey = firstSelected
        ? getDisplayText(firstSelected.value)
        : "Other";

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push({ ...variant, originalIndex: index });
    });

    return groups;
  }, [variants, options, getDisplayText]);

  const toggleGroup = useCallback(
    (groupKey: string) => {
      const newExpanded = new Set(expandedGroups);
      if (newExpanded.has(groupKey)) {
        newExpanded.delete(groupKey);
      } else {
        newExpanded.add(groupKey);
      }
      setExpandedGroups(newExpanded);
    },
    [expandedGroups],
  );

  const toggleVariant = useCallback(
    (index: number) => {
      const newExpanded = new Set(expandedVariants);
      if (newExpanded.has(index)) {
        newExpanded.delete(index);
      } else {
        newExpanded.add(index);
      }
      setExpandedVariants(newExpanded);
    },
    [expandedVariants],
  );

  const updateVariant = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (index: number, field: keyof Variant, val: any) => {
      const newVariants = [...variants];
      newVariants[index] = { ...newVariants[index], [field]: val };
      setValue(newVariants);
    },
    [variants, setValue],
  );

  const totalInventory = variants.reduce(
    (sum, v) => sum + (v.inventory || 0),
    0,
  );
  const firstOptionName = options[0]
    ? getDisplayText(options[0].name)
    : "Option";

  return (
    <div className="field-type array-field">
      <div style={{ marginBottom: "1rem" }}>
        <FieldLabel label="Variants" required={false} />
        <div
          style={{
            marginTop: "0.5rem",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Button
            buttonStyle="primary"
            size="small"
            onClick={generateVariants}
            iconPosition="left"
            icon="plus"
          >
            Generate variants
          </Button>
          {variants.length > 0 && (
            <span
              style={{
                fontSize: "0.875rem",
                color: "var(--theme-elevation-600)",
              }}
            >
              {variants.length} variant{variants.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {variants.length > 0 && (
        <>
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--theme-elevation-600)",
              marginBottom: "1rem",
            }}
          >
            Group by <strong>{firstOptionName}</strong>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {Object.entries(groupedVariants).map(
              ([groupKey, groupVariants]) => {
                const isGroupExpanded = expandedGroups.has(groupKey);
                const groupInventory = groupVariants.reduce(
                  (sum, v) => sum + (v.inventory || 0),
                  0,
                );

                return (
                  <div
                    key={groupKey}
                    style={{
                      border: "1px solid var(--theme-elevation-150)",
                      borderRadius: "4px",
                      backgroundColor: "var(--theme-elevation-0)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        cursor: "pointer",
                        backgroundColor: "var(--theme-elevation-50)",
                      }}
                      onClick={() => toggleGroup(groupKey)}
                    >
                      <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        style={{ cursor: "pointer" }}
                      />
                      {isGroupExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                          {groupKey}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--theme-elevation-500)",
                          }}
                        >
                          {groupVariants.length} variant
                          {groupVariants.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: "80px" }}>
                        <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                          Price
                        </div>
                      </div>
                      <div style={{ textAlign: "right", minWidth: "80px" }}>
                        <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                          Available
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--theme-elevation-500)",
                          }}
                        >
                          {groupInventory}
                        </div>
                      </div>
                    </div>

                    {isGroupExpanded &&
                      groupVariants.map((variant) => {
                        const variantIndex = variant.originalIndex;
                        const isExpanded = expandedVariants.has(variantIndex);

                        return (
                          <div
                            key={variant.id || variantIndex}
                            style={{
                              borderTop: "1px solid var(--theme-elevation-150)",
                              backgroundColor: "var(--theme-elevation-0)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "0.75rem 1rem",
                                paddingLeft: "3rem",
                                cursor: "pointer",
                              }}
                              onClick={() => toggleVariant(variantIndex)}
                            >
                              <input
                                type="checkbox"
                                onClick={(e) => e.stopPropagation()}
                                style={{ cursor: "pointer" }}
                              />
                              {isExpanded ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                              <div style={{ flex: 1, fontSize: "0.875rem" }}>
                                {getDisplayText(variant.title)}
                              </div>
                              <div
                                style={{ minWidth: "120px" }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input
                                  type="number"
                                  value={variant.price || 0}
                                  onChange={(e) =>
                                    updateVariant(
                                      variantIndex,
                                      "price",
                                      parseFloat(e.target.value) || 0,
                                    )
                                  }
                                  style={{
                                    width: "100%",
                                    padding: "0.25rem 0.5rem",
                                    border:
                                      "1px solid var(--theme-elevation-250)",
                                    borderRadius: "4px",
                                    fontSize: "0.875rem",
                                    backgroundColor: "var(--theme-input-bg)",
                                    color: "var(--theme-input-color)",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  minWidth: "80px",
                                  textAlign: "right",
                                  fontSize: "0.875rem",
                                }}
                              >
                                {variant.inventory || 0}
                              </div>
                            </div>

                            {isExpanded && (
                              <div
                                style={{
                                  borderTop:
                                    "1px solid var(--theme-elevation-150)",
                                  padding: "1rem",
                                  paddingLeft: "3rem",
                                  backgroundColor: "var(--theme-elevation-50)",
                                }}
                              >
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "1rem",
                                  }}
                                >
                                  <div>
                                    <label
                                      style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                      }}
                                    >
                                      Price
                                    </label>
                                    <input
                                      type="number"
                                      value={variant.price || 0}
                                      onChange={(e) =>
                                        updateVariant(
                                          variantIndex,
                                          "price",
                                          parseFloat(e.target.value) || 0,
                                        )
                                      }
                                      style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        border:
                                          "1px solid var(--theme-elevation-250)",
                                        borderRadius: "4px",
                                        fontSize: "0.875rem",
                                        backgroundColor:
                                          "var(--theme-input-bg)",
                                        color: "var(--theme-input-color)",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                      }}
                                    >
                                      Compare at Price
                                    </label>
                                    <input
                                      type="number"
                                      value={variant.compareAtPrice || ""}
                                      onChange={(e) =>
                                        updateVariant(
                                          variantIndex,
                                          "compareAtPrice",
                                          parseFloat(e.target.value) ||
                                            undefined,
                                        )
                                      }
                                      style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        border:
                                          "1px solid var(--theme-elevation-250)",
                                        borderRadius: "4px",
                                        fontSize: "0.875rem",
                                        backgroundColor:
                                          "var(--theme-input-bg)",
                                        color: "var(--theme-input-color)",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                      }}
                                    >
                                      SKU
                                    </label>
                                    <input
                                      type="text"
                                      value={variant.sku || ""}
                                      onChange={(e) =>
                                        updateVariant(
                                          variantIndex,
                                          "sku",
                                          e.target.value,
                                        )
                                      }
                                      style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        border:
                                          "1px solid var(--theme-elevation-250)",
                                        borderRadius: "4px",
                                        fontSize: "0.875rem",
                                        backgroundColor:
                                          "var(--theme-input-bg)",
                                        color: "var(--theme-input-color)",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                      }}
                                    >
                                      Barcode
                                    </label>
                                    <input
                                      type="text"
                                      value={variant.barcode || ""}
                                      onChange={(e) =>
                                        updateVariant(
                                          variantIndex,
                                          "barcode",
                                          e.target.value,
                                        )
                                      }
                                      style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        border:
                                          "1px solid var(--theme-elevation-250)",
                                        borderRadius: "4px",
                                        fontSize: "0.875rem",
                                        backgroundColor:
                                          "var(--theme-input-bg)",
                                        color: "var(--theme-input-color)",
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label
                                      style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                      }}
                                    >
                                      Inventory
                                    </label>
                                    <input
                                      type="number"
                                      value={variant.inventory || 0}
                                      onChange={(e) =>
                                        updateVariant(
                                          variantIndex,
                                          "inventory",
                                          parseInt(e.target.value) || 0,
                                        )
                                      }
                                      style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        border:
                                          "1px solid var(--theme-elevation-250)",
                                        borderRadius: "4px",
                                        fontSize: "0.875rem",
                                        backgroundColor:
                                          "var(--theme-input-bg)",
                                        color: "var(--theme-input-color)",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              },
            )}
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "var(--theme-elevation-600)",
              padding: "1rem",
            }}
          >
            Total inventory: <strong>{totalInventory}</strong> available
          </div>
        </>
      )}

      {variants.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--theme-elevation-500)",
            border: "2px dashed var(--theme-elevation-150)",
            borderRadius: "4px",
          }}
        >
          <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            No variants yet
          </p>
          <p style={{ fontSize: "0.75rem" }}>
            Add options above, then click &quot;Generate variants&quot; to
            create product variants
          </p>
        </div>
      )}
    </div>
  );
};
