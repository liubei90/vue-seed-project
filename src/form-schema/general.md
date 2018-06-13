## 通用申请

### api:

    $API_ROOT/office/apply/generals

### method:

    POST
    {
        'department_id': 1,             // 所属部门
        'apply_content': {
            'cost_department_id': 12,       // 核算部门
            'amount': 123.23,               // 合计金额
            'bank': 'wer',              // 收款银行
            'bank_account': '1232342',      // 账户
            'payee_id': 1,              // 收款人
            'general_date': '2018/1/1',         // 日期
            'department_id': 1,             // 所属部门
            'general_content': 'content'        // 审批详情
        },
        'amount':200                     // 总金额
        'is_cost': false                  // 是否打款(标识) 默认为false 不填为false
        'approval_ids': [1],
        'general_detail': [
            {
                'amount': 200,              // 金额
                'content': 'name11',            // 申请内容
                'cost_item': 10             // 费用项目
            },
            {
                'amount': 200.32,
                'content': 'name11',
                'cost_item': 11
            }
        ],
        'vouchers': [
            {
                'voucher_type': 1,
                'path': 'qiniu_path'
            }
        ]
    }

### return:

    {
      "body": {
        "id": 1
      },
      "code": "000000",
      "message": ""
    }