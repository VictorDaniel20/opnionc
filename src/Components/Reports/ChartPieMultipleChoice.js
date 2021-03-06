import React, { useCallback, useEffect, useState } from 'react'

import { ResponsivePie } from '@nivo/pie'

function ChartPieNumber(props) {
  const { formAnswersList, reportType } = props

  const [data, setData] = useState([
    {
      id: 'Opção 1',
      label: 'Opção 1',
      value: 436,
      color: 'hsl(16, 70%, 50%)',
    },
    {
      id: 'Opção 2',
      label: 'Opção 2',
      value: 278,
      color: 'hsl(15, 70%, 50%)',
    },
    {
      id: 'Opção 3',
      label: 'Opção 3',
      value: 526,
      color: 'hsl(82, 70%, 50%)',
    },
    {
      id: 'Opção 4',
      label: 'Opção 4',
      value: 547,
      color: 'hsl(209, 70%, 50%)',
    },
    {
      id: 'Opção 5',
      label: 'Opção 5',
      value: 531,
      color: 'hsl(54, 70%, 50%)',
    },
  ])

  useEffect(() => {
    const newFormAnswersList = formAnswersList.filter(
      (item) => item.assessment_key === reportType.code,
    )
    let newOptions = []
    for (let i = 0; i < newFormAnswersList.length; i++) {
      // eslint-disable-next-line
      const response = newFormAnswersList[i].createdForm.map((item) => {
        if (item.type === 'multipleChoice') {
          return item.options
        }
      })
      const [newResponse] = response.filter((vR) => vR)
      // eslint-disable-next-line
      newResponse.map((item) => {
        // eslint-disable-next-line
        if (!newOptions.find((opt) => item.name === opt.id)) {
          newOptions.push({
            id: item.name,
            label: item.name,
            value: item.disabled ? 1 : 0,
            color: 'hsl(54, 70%, 50%)',
          })
        } else {
          const newData = newOptions.map((idxOpt, idx) => {
            if (item.name === idxOpt.id) {
              return idx
            }
            return -1
          })
          const [newDataFilter] = newData.filter((opt1) => opt1 !== -1)
          for (let j = 0; j < newOptions.length; j++) {
            if (j === newDataFilter) {
              const newDataArray = {
                id: newOptions[j].id,
                label: newOptions[j].label,
                value: item.disabled
                  ? newOptions[j].value + 1
                  : newOptions[j].value,
                color: 'hsl(54, 70%, 50%)',
              }
              newOptions[j] = newDataArray
            }
          }
        }
      })
    }
    setData(newOptions)
    // eslint-disable-next-line
  }, [])

  const createChart = useCallback(() => {
    return (
      <ResponsivePie
        data={data}
        theme={{
          labels: {
            text: { fontSize: '20px' },
          },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'ruby',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'c',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'go',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'python',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'scala',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'lisp',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'elixir',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'javascript',
            },
            id: 'lines',
          },
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    )
  }, [data])

  return createChart()
}

export default ChartPieNumber
