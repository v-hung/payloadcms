"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useField, Button, FieldLabel } from "@payloadcms/ui";
import type { ArrayFieldClientProps } from "payload";
import type { Product } from "@/types/payload";
import { GripVertical } from "lucide-react";

type OptionValue = NonNullable<Product["options"]>[number]["values"][number];
type ProductOption = NonNullable<Product["options"]>[number];

export const ProductOptionsField: React.FC<ArrayFieldClientProps> = (props) => {
  const { path } = props;
  const { value, setValue } = useField<Product["options"]>({ path });

  const options = useMemo(
    () =>
      (value || []).map((opt) => ({
        ...opt,
        values: opt.values || [],
      })),
    [value],
  );

  const [expandedOptions, setExpandedOptions] = useState<Set<number>>(
    new Set(options.map((_, i) => i)),
  );

  const addOption = useCallback(() => {
    const newOption: ProductOption = {
      name: "",
      values: [],
      id: `option-${Date.now()}`,
    };
    setValue([...options, newOption]);
    setExpandedOptions(new Set([...expandedOptions, options.length]));
  }, [options, expandedOptions, setValue]);

  const removeOption = useCallback(
    (index: number) => {
      const newOptions = options.filter((_, i) => i !== index);
      setValue(newOptions);
      const newExpanded = new Set(expandedOptions);
      newExpanded.delete(index);
      setExpandedOptions(newExpanded);
    },
    [options, expandedOptions, setValue],
  );

  const updateOptionName = useCallback(
    (index: number, name: string) => {
      const newOptions = [...options];
      newOptions[index] = { ...newOptions[index], name };
      setValue(newOptions);
    },
    [options, setValue],
  );

  const addValue = useCallback(
    (optionIndex: number) => {
      const newOptions = [...options];
      const newValue: OptionValue = {
        label: "",
        id: `value-${Date.now()}`,
      };
      newOptions[optionIndex].values = [
        ...(newOptions[optionIndex].values || []),
        newValue,
      ];
      setValue(newOptions);
    },
    [options, setValue],
  );

  const updateValue = useCallback(
    (optionIndex: number, valueIndex: number, label: string) => {
      const newOptions = [...options];
      const values = newOptions[optionIndex].values || [];
      newOptions[optionIndex].values = [...values];
      newOptions[optionIndex].values[valueIndex] = {
        ...values[valueIndex],
        label,
      };
      setValue(newOptions);
    },
    [options, setValue],
  );

  const removeValue = useCallback(
    (optionIndex: number, valueIndex: number) => {
      const newOptions = [...options];
      newOptions[optionIndex].values = (
        newOptions[optionIndex].values || []
      ).filter((_, i) => i !== valueIndex);
      setValue(newOptions);
    },
    [options, setValue],
  );

  const toggleExpand = useCallback(
    (index: number) => {
      const newExpanded = new Set(expandedOptions);
      if (newExpanded.has(index)) {
        newExpanded.delete(index);
      } else {
        newExpanded.add(index);
      }
      setExpandedOptions(newExpanded);
    },
    [expandedOptions],
  );

  const getDisplayName = (
    name: string | { en?: string; vi?: string } | null | undefined,
  ): string => {
    if (!name) return "";
    if (typeof name === "string") return name;
    return name?.en || name?.vi || "";
  };

  const getDisplayLabel = (
    label: string | { en?: string; vi?: string } | null | undefined,
  ): string => {
    if (!label) return "";
    if (typeof label === "string") return label;
    return label?.en || label?.vi || "";
  };

  return (
    <div className="field-type array-field">
      <div style={{ marginBottom: "1rem" }}>
        <FieldLabel label="Product Options" required={false} />
        <div style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
          <Button
            buttonStyle="primary"
            size="small"
            onClick={addOption}
            iconPosition="left"
            icon="plus"
          >
            Add option
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {options.map((option, optionIndex) => {
          const isExpanded = expandedOptions.has(optionIndex);
          const displayName = getDisplayName(option.name);

          return (
            <div
              key={option.id || optionIndex}
              style={{
                border: "1px solid var(--theme-elevation-150)",
                borderRadius: "4px",
                backgroundColor: "var(--theme-elevation-50)",
              }}
            >
              {/* Option Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem",
                  cursor: "pointer",
                  backgroundColor: isExpanded
                    ? "var(--theme-elevation-50)"
                    : "var(--theme-elevation-0)",
                }}
                onClick={() => toggleExpand(optionIndex)}
              >
                <GripVertical
                  size={20}
                  style={{ color: "var(--theme-elevation-400)", flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                    {displayName || "New Option"}
                  </div>
                  {!isExpanded && (option.values || []).length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {(option.values || []).map((val, i) => {
                        const label = getDisplayLabel(val.label);
                        return label ? (
                          <span
                            key={val.id || i}
                            style={{
                              padding: "0.25rem 0.75rem",
                              backgroundColor: "var(--theme-elevation-150)",
                              color: "var(--theme-elevation-800)",
                              borderRadius: "4px",
                              fontSize: "0.875rem",
                            }}
                          >
                            {label}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                <Button
                  buttonStyle="secondary"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(optionIndex);
                  }}
                  icon="x"
                  round
                />
              </div>

              {/* Option Content (Expanded) */}
              {isExpanded && (
                <div
                  style={{
                    borderTop: "1px solid var(--theme-elevation-150)",
                    padding: "1rem",
                    backgroundColor: "var(--theme-elevation-0)",
                  }}
                >
                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                    >
                      Option name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Size, Color, Material"
                      value={displayName}
                      onChange={(e) =>
                        updateOptionName(optionIndex, e.target.value)
                      }
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border: "1px solid var(--theme-elevation-250)",
                        borderRadius: "4px",
                        fontSize: "0.875rem",
                        backgroundColor: "var(--theme-input-bg)",
                        color: "var(--theme-input-color)",
                      }}
                    />
                  </div>

                  <div>
                    <FieldLabel label="Option values" required={true} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {(option.values || []).map((val, valueIndex) => (
                        <div
                          key={val.id || valueIndex}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <GripVertical
                            size={16}
                            style={{
                              color: "var(--theme-elevation-400)",
                              flexShrink: 0,
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Add value"
                            value={getDisplayLabel(val.label)}
                            onChange={(e) =>
                              updateValue(
                                optionIndex,
                                valueIndex,
                                e.target.value,
                              )
                            }
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              flex: 1,
                              padding: "0.5rem",
                              border: "1px solid var(--theme-elevation-250)",
                              borderRadius: "4px",
                              fontSize: "0.875rem",
                              backgroundColor: "var(--theme-input-bg)",
                              color: "var(--theme-input-color)",
                            }}
                          />
                          <Button
                            buttonStyle="secondary"
                            size="small"
                            onClick={() => removeValue(optionIndex, valueIndex)}
                            icon="x"
                            round
                          />
                        </div>
                      ))}
                      <Button
                        buttonStyle="secondary"
                        size="small"
                        onClick={() => addValue(optionIndex)}
                        iconPosition="left"
                        icon="plus"
                      >
                        Add another value
                      </Button>
                    </div>
                  </div>

                  <div style={{ marginTop: "1rem" }}>
                    <Button
                      buttonStyle="primary"
                      size="small"
                      onClick={() => toggleExpand(optionIndex)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {options.length === 0 && (
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
            No options yet
          </p>
          <p style={{ fontSize: "0.75rem" }}>
            Add options like Size, Color, Material to create product variants
          </p>
        </div>
      )}
    </div>
  );
};
